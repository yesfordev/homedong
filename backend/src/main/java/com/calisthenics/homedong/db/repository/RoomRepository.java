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
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-08-03
 * with Yeseul Kim😘 on 2021-08-05
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    @Query("select new com.calisthenics.homedong.api.response.BestRecordRes(r.gameType, max(e.count)) " +
            "from Room r join r.games g join g.entries e " +
            "where e.userId = :userId " +
            "group by r.gameType")
    List<BestRecordRes> getBestRecordByUserId(@Param("userId") Integer userId);

    Room findByRoomId(String roomId);

    Optional<Room> findByRoomIdAndAndPasswordAndStatus(String roomId, String password, String Status);

    @Query(value="SELECT r.roomId FROM Room r WHERE r.gameType = ?1 and r.isPublic = ?2 and r.status = ?3")
    List<String> findQuickRoomIds(Integer gameType, boolean isPublic, String status);

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
