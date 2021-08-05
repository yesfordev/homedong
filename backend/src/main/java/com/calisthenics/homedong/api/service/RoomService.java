package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.request.MakeRoomReq;
import com.calisthenics.homedong.api.response.RoomRes;
import com.calisthenics.homedong.db.entity.Room;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Seo Youngeun on 2021-08-05
 *
 * 방 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void makeRoom(String roomId, final MakeRoomReq makeRoomReq) {
        Room room = Room.builder()
                .roomId(roomId)
                .gameType(makeRoomReq.getGameType())
                .isPublic(makeRoomReq.getPassword() == "" ? true : false)
                .password(makeRoomReq.getPassword())
                .status("ON")
                .build();
        roomRepository.save(room);
    }

    public RoomRes getRoomRes(String token, String roomId, String gameType) {
        RoomRes roomRes = new RoomRes();
        User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        roomRes.setToken(token);
        roomRes.setRoomId(roomId);
        roomRes.setGameType(gameType);
        roomRes.setNickname(user.getNickname());

        return roomRes;
    }
}
