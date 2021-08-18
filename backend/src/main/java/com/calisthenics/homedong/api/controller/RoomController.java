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
    private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();

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

    @PostMapping("")
    @ApiOperation(value = "방을 만들 때 사용", notes = "<strong>방 만들기</strong>을 통해 세션과 토큰을 생성 후 토큰, 방이름, 게임종류, 닉네임 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 만들기 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> makeRoom(@RequestBody MakeRoomReq makeRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, 1);

        // DB 저장
        roomService.makeRoom(roomId, makeRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, makeRoomReq.getGameType()));
    }

    @PostMapping("/search")
    @ApiOperation(value = "방을 검색할 때 사용", notes = "<strong>방 검색</strong>을 통해 검색하는 방이 존재한다면 토큰, 방이름, 게임종류, 닉네임을 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 검색 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "방 접속 불가능 상태(GAME | FULL)", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> findRoom(@RequestBody FindRoomReq findRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 검색할 방이 존재하는지 확인
        Room room = roomService.findRoom(findRoomReq);
        String roomId = room.getRoomId();
        Integer gameType = room.getGameType();

        // 검색하는 방이 존재하지 않을 경우
        if (this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }
        // 인원초과일 경우
        if (this.mapSessions.get(roomId) >= LIMIT) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, this.mapSessions.get(roomId) + 1);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, gameType));
    }

    @PostMapping("/quick")
    @ApiOperation(value = "빠른 시작을 할 때 사용", notes = "<strong>빠른 시작</strong>을 통해 선택한 종목의 방이 있으면 반환하고 없다면 새로 생성 후 토큰, 방이름, 게임종류, 닉네임 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "빠른 시작 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> quickRoom(@RequestBody QuickRoomReq quickRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        List<String> roomIds = roomService.quickRoom(quickRoomReq);

        /************ 참가할 방이 존재한다면 ************/
        if (!roomIds.isEmpty()) {
            int min = LIMIT;
            String minConnRoomId = null;

            // 해당 종목의 방마다 참가할 수 있는지 확인
            for (String roomId : roomIds) {
                // 검색하는 방이 존재하지 않거나 인원초과일 경우
                if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) >= LIMIT) continue;

                if (min > mapSessions.get(roomId)) {
                    min = mapSessions.get(roomId);
                    minConnRoomId = roomId;
                }
            }

            // 참가할 수 있다면
            if (minConnRoomId != null) {
                // 방 관리 map에 저장
                this.mapSessions.put(minConnRoomId, this.mapSessions.get(minConnRoomId) + 1);

                return ResponseEntity.ok(roomService.getRoomRes(minConnRoomId, quickRoomReq.getGameType()));
            }
        }
        /************ 참가할 방이 존재하지 않다면 ************/
        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, 1);

        // DB 저장
        roomService.makeRoom(roomId, quickRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, quickRoomReq.getGameType()));
    }

    @PutMapping("")
    @ApiOperation(value = "참가자가 방을 나갈 경우 사용", notes = "<strong>방 나가기</strong>를 통해 방 정보 OFF로 변경 및 방 관리 map에서 해당 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 나가기 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity leaveRoom(@RequestBody LeaveRoomReq leaveRoomReq) {
        String roomId = leaveRoomReq.getRoomId();

        // 나가려는 방이 없다면
        if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }

        int cnt = this.mapSessions.get(roomId);
        
        // 마지막 참가자라면
        if (cnt == 1) {
            // 방 관리 map에서 삭제
            this.mapSessions.remove(roomId);
            
            // DB에서 OFF로 업데이트
            roomService.updateStatus(roomId);
        } else {
            // 방 관리 map에서 인원수 갱신
            this.mapSessions.put(roomId, cnt - 1);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
