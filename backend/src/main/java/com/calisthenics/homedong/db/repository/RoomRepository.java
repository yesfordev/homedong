package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.api.response.DailyCalendarRes;
import com.calisthenics.homedong.api.response.DailyRecord;
import com.calisthenics.homedong.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    @Query("select new com.calisthenics.homedong.api.response.BestRecordRes(r.gameType, max(e.count)) " +
            "from Room r join r.games g join g.entries e " +
            "where e.userId = :userId " +
            "group by r.gameType")
    List<BestRecordRes> getBestRecordByUserId(@Param("userId") Integer userId);

    Room findByRoomId(String roomId);

    @Query("select new com.calisthenics.homedong.api.response.DailyCalendarRes(function('date_format', g.createdAt, '%Y-%m-%d') as date) " +
            "from Game g join g.entries e " +
            "where e.userId = :userId and function('year', g.createdAt) = :year and function('month', g.createdAt) = :month " +
            "group by function('date_format', g.createdAt, '%Y-%m-%d')" +
            "order by date asc ")
    List<DailyCalendarRes> getDailyDateByUserId(@Param("userId") Integer userId, @Param("year") int year, @Param("month") int month);

    @Query("select new com.calisthenics.homedong.api.response.DailyRecord(function('date_format', g.createdAt, '%Y-%m-%d') as date, r.gameType as gameType, max(e.count) as record) " +
            "from Room r join r.games g join g.entries e " +
            "where e.userId = :userId and function('year', g.createdAt) = :year and function('month', g.createdAt) = :month " +
            "group by function('date_format', g.createdAt, '%Y-%m-%d'), r.gameType " +
            "order by date asc")
    List<DailyRecord> getDailyRecord(@Param("userId") Integer userId, @Param("year") int year, @Param("month") int month);

}
