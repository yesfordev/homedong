package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.dto.BestRecordRes;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Service("honedongService")
public class RecordService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public RecordService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public List<BestRecordRes> getBestRecord() {
        User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        if(user == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(""));
        }

        return roomRepository.getBestRecordByUserId(user.getUserId());
    }
}
