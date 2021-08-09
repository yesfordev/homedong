package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.response.IRanking;
import com.calisthenics.homedong.api.response.RankingRes;
import com.calisthenics.homedong.db.repository.RoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-08
 */
@Slf4j
@Service
public class RankingService {

    private final RoomRepository roomRepository;

    @Autowired
    public RankingService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Cacheable(value = "ranking", cacheManager = "rankCacheManager")
    public List<RankingRes> getRanking(Integer gameType, Integer limit) {

        List<IRanking> nowRankingList = roomRepository.getRankingRes(gameType, 0, limit);
        List<IRanking> previousRankinList = roomRepository.getRankingRes(gameType, 1, limit);

        List<RankingRes> rankingResList = new ArrayList<>();

        for (IRanking nowRanking : nowRankingList) {
            rankingResList.add(new RankingRes(nowRanking.getRanking(), nowRanking.getNickname(), nowRanking.getCount()));
        }

        for (RankingRes rankingRes : rankingResList) {
            for (IRanking previousRanking : previousRankinList) {
                if (rankingRes.getNickname().equals(previousRanking.getNickname())) {
                    int difference = previousRanking.getRanking() - rankingRes.getRanking();

                    if (difference < 0) {
                        rankingRes.setChangeStatus("down");
                        rankingRes.setChangeRanking(Math.abs(difference));
                    } else if (difference > 0) {
                        rankingRes.setChangeStatus("up");
                        rankingRes.setChangeRanking(difference);
                    } else if (difference == 0) {
                        rankingRes.setChangeStatus("noChange");
                        rankingRes.setChangeRanking(0);
                    }
                }
            }
        }

        //마지막에 정렬 필요
        Collections.sort(rankingResList, new Comparator<RankingRes>() {
            @Override
            public int compare(RankingRes o1, RankingRes o2) {
                return o1.getRanking() - o2.getRanking();
            }
        });

        return rankingResList;
    }

    /**
     * 매일 자정에
     * cache 삭제
     */
    @CacheEvict(allEntries = true, value = "ranking", cacheManager = "rankCacheManager")
    @Scheduled(cron = "0 0 0 * * *")
    public void cacheEvict() {
        log.info("all cache remove");
    }

}
