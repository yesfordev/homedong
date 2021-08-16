package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.response.BadgeRes;
import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.api.response.ICurrnetRanking;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.RoomRepository;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.BadgeUtil;
import com.calisthenics.homedong.util.SecurityUtil;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Service
public class RecordService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Value("${custom.gameTypeCount}")
    private int gameTypeCount;

    private Map<Integer, String> gameMap = new HashMap<>();
    private BadgeUtil badgeUtil;
    private int getAdvancedBadge;

    @Autowired
    public RecordService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;

        gameMap.put(1, "SQUAT");
        gameMap.put(2, "PUSHUP");
        gameMap.put(3, "BURPEE");
    }

    @Transactional(readOnly = true)
    public List<BestRecordRes> getBestRecord() {
        User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        if (user == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(""));
        }

        // 최고 기록
        Integer userId = user.getUserId();
        List<BestRecordRes> bestRecordResList = roomRepository.getBestRecordByUserId(userId);

        Set<Integer> gameTypeTemp = new HashSet<>();

        for (int idx = 1; idx <= gameTypeCount; idx++) {
            gameTypeTemp.add(idx);
        }

        for (BestRecordRes bestRecordRes : bestRecordResList) {
            gameTypeTemp.remove(bestRecordRes.getGameType());
        }

        for (Integer key : gameTypeTemp) {
            bestRecordResList.add(new BestRecordRes(key, -1));
        }

        for (BestRecordRes bestRecordRes : bestRecordResList) {
            List<ICurrnetRanking> rankingList = roomRepository.findRankingByUserId(bestRecordRes.getGameType());

            Integer ranking = -1;
            for(ICurrnetRanking currnetRanking : rankingList) {
                if(currnetRanking.getUserId() == userId) {
                    ranking = currnetRanking.getRanking();
                    break;
                }
            }

            if (ranking != -1) {
                bestRecordRes.setRanking(ranking);
            }
        }

        Collections.sort(bestRecordResList, new Comparator<BestRecordRes>() {
            @Override
            public int compare(BestRecordRes o1, BestRecordRes o2) {
                return o1.getGameType() - o2.getGameType();
            }
        });

        return bestRecordResList;
    }

    @Transactional(readOnly = true)
    public BadgeRes getBadgeRecord() {
        List<BestRecordRes> bestRecordResList = getBestRecord();
        BadgeRes badgeRes = new BadgeRes(gameTypeCount);

        getAdvancedBadge = 0;

        for (BestRecordRes bestRecordRes : bestRecordResList) {
            updateBadgeRes(bestRecordRes, badgeRes);
        }

        if (getAdvancedBadge == 3) {
            badgeRes.setHomedongKing(true);
        }

        return badgeRes;
    }

    private void updateBadgeRes(BestRecordRes bestRecordRes, BadgeRes badgeRes) {
        int gameType = bestRecordRes.getGameType();

        BadgeUtil game = badgeUtil.valueOf(gameMap.get(gameType));

        if (bestRecordRes.getBestRecord() >= game.getBeginner()) {
            badgeRes.getBadges().get(gameType - 1).setBeginner(true);
        }
        if (bestRecordRes.getBestRecord() >= game.getIntermediate()) {
            badgeRes.getBadges().get(gameType - 1).setIntermediate(true);
        }
        if (bestRecordRes.getBestRecord() >= game.getAdvanced()) {
            badgeRes.getBadges().get(gameType - 1).setAdvanced(true);
            ++getAdvancedBadge;
        }
    }

}
