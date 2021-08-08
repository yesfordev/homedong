package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.FindRoomReq;
import com.calisthenics.homedong.api.request.LeaveRoomReq;
import com.calisthenics.homedong.api.request.MakeRoomReq;
import com.calisthenics.homedong.api.request.QuickRoomReq;
import com.calisthenics.homedong.api.response.RoomRes;
import com.calisthenics.homedong.api.service.RoomService;
import com.calisthenics.homedong.db.entity.Room;
import com.calisthenics.homedong.error.exception.InvalidValueException;
import com.calisthenics.homedong.error.exception.custom.RoomStatusIsNotAvailableException;
import com.calisthenics.homedong.error.exception.custom.RoomNotFoundException;
import com.calisthenics.homedong.util.RandomNumberUtil;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import com.calisthenics.homedong.error.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Yeseul Kim on 2021-08-05
 */

@Api(value = "방 관리 API", tags = {"Room"})
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final int LIMIT = 6;
    private final RoomService roomService;

    // 오픈비두 객체 SDK
    private OpenVidu openVidu;
    
    // 방 관리
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    
    // 오픈비두 서버 관련 변수
    private String OPENVIDU_URL;
    private String SECRET;

    // RoomController에 접근할 때마다 오픈비두 서버 관련 변수를 얻어옴
    @Autowired
    public RoomController(RoomService roomService, @Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.roomService = roomService;

        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }
    
    @PostMapping("/")
    @ApiOperation(value = "방을 만들 때 사용", notes = "<strong>방 만들기</strong>을 통해 세션과 토큰을 생성 후 토큰, 방이름, 게임종류, 닉네임 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 만들기 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<RoomRes> makeRoom(@RequestBody MakeRoomReq makeRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 세션 연결을 하기 위해 전달해야 될 정보 설정(사용자 정보 닉네임 넘겨줄 건지?)
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().
                type(ConnectionType.WEBRTC).
                data("nickname").
                role(OpenViduRole.PUBLISHER).
                build();

        // 오픈비두 세션 생성
        Session session = this.openVidu.createSession();
        // 세션에 연결 후 프론트에서 연결을 위한 토큰 반환
        String token = session.createConnection(connectionProperties).getToken();

        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();
        
        // 방 관리 map에 저장
        this.mapSessions.put(roomId, session);
        this.mapSessionNamesTokens.put(roomId, new ConcurrentHashMap<>());
        this.mapSessionNamesTokens.get(roomId).put(token, OpenViduRole.PUBLISHER);

        // DB 저장
        roomService.makeRoom(roomId, makeRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(token, roomId, makeRoomReq.getGameType()));
    }

    @PostMapping("/search")
    @ApiOperation(value = "방을 검색할 때 사용", notes = "<strong>방 검색</strong>을 통해 검색하는 방이 존재한다면 토큰, 방이름, 게임종류, 닉네임을 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 검색 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "방 인원초과.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<RoomRes> findRoom(@RequestBody FindRoomReq findRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 검색할 방이 존재하는지 확인
        Room room = roomService.findRoom(findRoomReq);
        String roomId = room.getRoomId();
        Integer gameType = room.getGameType();

        // 세션 연결을 하기 위해 전달해야 될 정보 설정(사용자 정보 닉네임 넘겨줄 건지?)
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().
                type(ConnectionType.WEBRTC).
                data("nickname").
                role(OpenViduRole.PUBLISHER).
                build();

        // 검색하는 방이 존재하지 않을 경우
        if (this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }
        // 인원초과일 경우
        if (this.mapSessionNamesTokens.get(roomId).size() > LIMIT) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }

        // 세션에 연결 후 프론트에서 연결을 위한 토큰 반환
        String token = this.mapSessions.get(roomId).createConnection(connectionProperties).getToken();

        // 방 관리 map에 저장
        this.mapSessionNamesTokens.get(roomId).put(token, OpenViduRole.PUBLISHER);

        return ResponseEntity.ok(roomService.getRoomRes(token, roomId, gameType));
    }

    @PostMapping("/quick")
    @ApiOperation(value = "빠른 시작을 할 때 사용", notes = "<strong>빠른 시작</strong>을 통해 선택한 종목의 방이 있으면 반환하고 없다면 새로 생성 후 토큰, 방이름, 게임종류, 닉네임 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "빠른 시작 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<RoomRes> quickRoom(@RequestBody QuickRoomReq quickRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 세션 연결을 하기 위해 전달해야 될 정보 설정(사용자 정보 어떤 거 넘겨줄 건지?)
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().
                type(ConnectionType.WEBRTC).
                data("nickname").
                role(OpenViduRole.PUBLISHER).
                build();

        List<String> roomIds = roomService.quickRoom(quickRoomReq);
        /************ 참가할 방이 존재한다면 ************/
        if (!roomIds.isEmpty()) {
            // 해당 종목의 방마다 참가할 수 있는지 확인
            for (String roomId : roomIds) {
                // 검색하는 방이 존재하지 않거나 인원초과일 경우
                if (this.mapSessions.get(roomId) == null || mapSessionNamesTokens.get(roomId).size() > LIMIT) continue;

                // 참가할 수 있다면
                // 세션에 연결 후 프론트에서 연결을 위한 토큰 반환
                String token = this.mapSessions.get(roomId).createConnection(connectionProperties).getToken();

                // 방 관리 map에 저장
                this.mapSessionNamesTokens.get(roomId).put(token, OpenViduRole.PUBLISHER);

                return ResponseEntity.ok(roomService.getRoomRes(token, roomId, quickRoomReq.getGameType()));
            }
        }
        /************ 참가할 방이 존재하지 않다면 ************/
        // 오픈비두 세션 생성
        Session session = this.openVidu.createSession();
        // 세션에 연결 후 프론트에서 연결을 위한 토큰 반환
        String token = session.createConnection(connectionProperties).getToken();

        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, session);
        this.mapSessionNamesTokens.put(roomId, new ConcurrentHashMap<>());
        this.mapSessionNamesTokens.get(roomId).put(token, OpenViduRole.PUBLISHER);

        // DB 저장
        roomService.makeRoom(roomId, quickRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(token, roomId, quickRoomReq.getGameType()));
    }

    @PutMapping("/")
    @ApiOperation(value = "참가자가 방을 나갈 경우 사용", notes = "<strong>방 나가기</strong>를 통해 방 정보 OFF로 변경 및 방 관리 map에서 해당 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 나가기 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity leaveRoom(@RequestBody LeaveRoomReq leaveRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        String token = leaveRoomReq.getToken();
        String roomId = leaveRoomReq.getRoomId();

        // 나가려는 방이 없다면
        if (this.mapSessions.get(roomId) == null || this.mapSessionNamesTokens.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }

        // 토큰이 유효하지 않다면
        if (this.mapSessionNamesTokens.get(roomId).remove(token) == null) {
            throw new InvalidValueException(token);
        }

        // 마지막 참가자가 나갔다면
        if (this.mapSessionNamesTokens.get(roomId).isEmpty()) {
            // 방 관리 map에서 삭제
            this.mapSessions.remove(roomId);

            // DB에서 OFF로 업데이트
            roomService.updateStatus(roomId);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
