package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.dto.BestRecordRes;
import com.calisthenics.homedong.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

//    @Query("select new com.calisthenics.homedong.api.dto.BestRecordRes(r.gameType, max(e.count)) " +
//            "from Room r join fetch r.games g join fetch g.entries e " +
//            "where e.userId = ?1 " +
//            "group by r.gameType")
//    List<BestRecordRes> getBestRecordByUserId(int userId);

    @Query("select new com.calisthenics.homedong.api.dto.BestRecordRes(r.gameType, max(e.count)) " +
            "from Room r join r.games g join g.entries e " +
            "where e.userId = ?1 " +
            "group by r.gameType")
    List<BestRecordRes> getBestRecordByUserId(Integer userId);

}
