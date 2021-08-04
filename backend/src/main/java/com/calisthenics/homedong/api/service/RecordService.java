package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.response.BadgeRes;
import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

        List<BestRecordRes> bestRecordResList = roomRepository.getBestRecordByUserId(user.getUserId());

        Map<String, Integer> recordTemp = new HashMap<>();

        recordTemp.put("squat", -1);
        recordTemp.put("sitUp", -1);
        recordTemp.put("pushUp", -1);

        for(BestRecordRes bestRecordRes : bestRecordResList) {
            recordTemp.remove(bestRecordRes.getGameType());
        }

        for(String key : recordTemp.keySet()) {
            bestRecordResList.add(new BestRecordRes(key, recordTemp.get(key)));
        }

        return bestRecordResList;
    }

    public BadgeRes getBadgeRecord() {
        List<BestRecordRes> bestRecordResList = getBestRecord();
        BadgeRes badgeRes = new BadgeRes();

        int getAdvancedBadge = 0;
        for(BestRecordRes bestRecordRes : bestRecordResList) {
            if(bestRecordRes.getGameType().equals("squat")) {
                if(bestRecordRes.getBestRecord() >= 100) {
                    badgeRes.getSquat().setBeginner(true);
                }
                if(bestRecordRes.getBestRecord() >= 200) {
                    badgeRes.getSquat().setIntermediate(true);
                }
                if(bestRecordRes.getBestRecord() >= 500) {
                    badgeRes.getSquat().setAdvanced(true);
                    ++getAdvancedBadge;
                }
            } else if(bestRecordRes.getGameType().equals("sitUp")) {
                if(bestRecordRes.getBestRecord() >= 60) {
                    badgeRes.getSitUp().setBeginner(true);
                }
                if(bestRecordRes.getBestRecord() >= 80) {
                    badgeRes.getSitUp().setIntermediate(true);
                }
                if(bestRecordRes.getBestRecord() >= 120) {
                    badgeRes.getSitUp().setAdvanced(true);
                    ++getAdvancedBadge;
                }
            } else if(bestRecordRes.getGameType().equals("pushUp")) {
                if(bestRecordRes.getBestRecord() >= 60) {
                    badgeRes.getPushUp().setBeginner(true);
                }
                if(bestRecordRes.getBestRecord() >= 80) {
                    badgeRes.getPushUp().setIntermediate(true);
                }
                if(bestRecordRes.getBestRecord() >= 120) {
                    badgeRes.getPushUp().setAdvanced(true);
                    ++getAdvancedBadge;
                }
            }

            if(getAdvancedBadge == 3) {
                badgeRes.setHomedongKing(true);
            }
        }

        return badgeRes;
    }
}
