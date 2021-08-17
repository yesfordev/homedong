package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.response.*;
import com.calisthenics.homedong.db.entity.Room;
import org.checkerframework.checker.nullness.Opt;
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

    @Query(value = "SELECT r.roomId FROM Room r WHERE r.gameType = :gameType and r.isPublic = :isPublic and r.status = :status")
    List<String> findQuickRoomIds(@Param("gameType") Integer gameType, @Param("isPublic") boolean isPublic, @Param("status") String status);

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

    @Query(value = "SELECT user.nickname AS nickname, user.img AS img, current.count AS count, \n" +
            "if(count < @prev_value, if(count = (@prev_value \\:= count), @vRank \\:= @vRank + 1, 0), @vRank) AS ranking \n" +
            "FROM (SELECT @vRank \\:= 0, @prev_value \\:= 9999) AS r,\n" +
            "(SELECT entry.user_id AS id, max(entry.count) as count\n" +
            "FROM room JOIN game \n" +
            "ON room.room_id = game.room_id\n" +
            "JOIN entry\n" +
            "ON game.game_id = entry.game_id\n" +
            "WHERE room.game_type = :gameType AND date_format(game.created_at, '%Y-%m-%d') < current_date - interval :day day\n" +
            "GROUP BY entry.user_id ORDER BY MAX(entry.count) DESC) AS current, user\n" +
            "WHERE user.user_id = current.id\n" +
            "LIMIT :limit", nativeQuery = true)
    List<IRanking> getRankingRes(@Param("gameType") Integer gameType, @Param("day") int day, @Param("limit") int limit);

    // user_id로 현재 랭킹 찾기
    @Query(value = "SELECT user.user_id AS userId, \n" +
            "if(count < @prev_value, if(count = (@prev_value \\:= count), @vRank \\:= @vRank + 1, 0), @vRank) AS ranking \n" +
            "FROM (SELECT @vRank \\:= 0, @prev_value \\:= 9999) AS r,\n" +
            "(SELECT entry.user_id AS id, max(entry.count) as count\n" +
            "FROM room JOIN game \n" +
            "ON room.room_id = game.room_id\n" +
            "JOIN entry\n" +
            "ON game.game_id = entry.game_id\n" +
            "WHERE room.game_type = :gameType AND date_format(game.created_at, '%Y-%m-%d') < current_date\n" +
            "GROUP BY entry.user_id ORDER BY MAX(entry.count) DESC) AS current, user\n" +
            "WHERE user.user_id = current.id", nativeQuery = true)
    List<ICurrnetRanking> findRankingByUserId(@Param("gameType") Integer gameTpye);

}
