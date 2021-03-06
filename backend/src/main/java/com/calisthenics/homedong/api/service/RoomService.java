package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.request.FindRoomReq;
import com.calisthenics.homedong.api.request.MakeRoomReq;
import com.calisthenics.homedong.api.request.QuickRoomReq;
import com.calisthenics.homedong.api.response.RoomRes;
import com.calisthenics.homedong.db.entity.Room;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.RoomNotFoundException;
import com.calisthenics.homedong.error.exception.custom.RoomPasswordNotMatchException;
import com.calisthenics.homedong.error.exception.custom.RoomStatusIsNotAvailableException;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Transactional
    public void makeRoom(String roomId, final QuickRoomReq quickRoomReq) {
        Room room = Room.builder()
                .roomId(roomId)
                .gameType(quickRoomReq.getGameType())
                .isPublic(true)
                .password("")
                .status("ON")
                .build();
        roomRepository.save(room);
    }

    @Transactional
    public Room findRoom(final FindRoomReq findRoomReq) {
        Room room = roomRepository.findByRoomId(findRoomReq.getRoomId());

        if (room == null) {
            throw new RoomNotFoundException(findRoomReq.getRoomId());
        }

        if (!room.getPassword().equals(findRoomReq.getPassword())) {
            throw new RoomPasswordNotMatchException(room.getRoomId());
        }

        if (room.getStatus().equals("OFF")) {
            throw new RoomNotFoundException(room.getStatus());
        }

        if (room.getStatus().equals("GAME")) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }
        
        if (!room.getStatus().equals("ON")) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }

        return roomRepository.findByRoomIdAndAndPasswordAndStatus(findRoomReq.getRoomId(), findRoomReq.getPassword(), "ON").orElse(null);
    }

    @Transactional
    public List<String> quickRoom(final QuickRoomReq quickRoomReq) {
        return roomRepository.findQuickRoomIds(quickRoomReq.getGameType(), true, "ON");
    }

    @Transactional
    public void updateStatus(String roomId) {
        Room updateRoom = roomRepository.findById(roomId).orElse(null);

        if (updateRoom == null) {
            throw new RoomNotFoundException(roomId);
        }

        updateRoom.setStatus("OFF");
        roomRepository.save(updateRoom);
    }

    @Transactional(readOnly = true)
    public RoomRes getRoomRes(String roomId, Integer gameType) {
        RoomRes roomRes = new RoomRes();
        User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        roomRes.setRoomId(roomId);
        roomRes.setGameType(gameType);
        roomRes.setNickname(user.getNickname());

        return roomRes;
    }
}
