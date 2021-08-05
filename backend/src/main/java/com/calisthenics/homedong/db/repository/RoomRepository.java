package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-08-03
 * with Yeseul Kim😘 on 2021-08-05
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    @Query("select new com.calisthenics.homedong.api.response.BestRecordRes(r.gameType, max(e.count)) " +
            "from Room r join r.games g join g.entries e " +
            "where e.userId = ?1 " +
            "group by r.gameType")
    List<BestRecordRes> getBestRecordByUserId(Integer userId);

    Room findByRoomId(String roomId);

    Optional<Room> findByRoomIdAndAndPasswordAndStatus(String roomId, String password, String Status);
}
