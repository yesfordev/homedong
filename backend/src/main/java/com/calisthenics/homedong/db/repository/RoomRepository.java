package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.api.response.DailyCalendarRes;
import com.calisthenics.homedong.api.response.DailyRecord;
import com.calisthenics.homedong.api.response.IRanking;
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

    @Query(value="SELECT r.roomId FROM Room r WHERE r.gameType = :gameType and r.isPublic = :isPublic and r.status = :status")
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

    //랭킹
    @Query(value = "SELECT user.nickname AS nickname, today.count AS count, today.ranking AS ranking FROM\n" +
            "(SELECT todayBest.id AS id, todayBest.count, \n" +
            "CASE\n" +
            "WHEN @prev_value = todayBest.count THEN @vRank\n" +
            "WHEN @prev_value \\:= todayBest.count THEN @vRank \\:= @vRank+1 \n" +
            "END AS ranking \n" +
            "FROM (SELECT @vRank \\:= 0, @prev_value \\:= NULL) AS r,\n" +
            "(SELECT entry.user_id AS id, max(entry.count) as count\n" +
            "FROM room JOIN game\n" +
            "ON room.room_id = game.room_id\n" +
            "JOIN entry\n" +
            "ON game.game_id = entry.game_id\n" +
            "WHERE room.game_type = :gameType AND date_format(game.created_at, '%Y-%m-%d') < current_date - interval :day day\n" +
            "GROUP BY entry.user_id ORDER BY MAX(entry.count) DESC) AS todayBest) AS today, user\n" +
            "WHERE user.user_id = today.id\n" +
            "LIMIT :limit", nativeQuery = true)
    List<IRanking> getRankingRes(@Param("gameType") Integer gameType, @Param("day") int day, @Param("limit") int limit);

    // user_id로 현재 랭킹 찾기
    @Query(value = "SELECT today.ranking AS ranking FROM\n" +
            "(SELECT todayBest.id AS id, todayBest.count, todayBest.gameType as gameType,\n" +
            "CASE\n" +
            "WHEN @prev_value = todayBest.count THEN @vRank\n" +
            "WHEN @prev_value \\:= todayBest.count THEN @vRank \\:= @vRank+1 \n" +
            "END AS ranking \n" +
            "FROM (SELECT @vRank \\:= 0, @prev_value \\:= NULL) AS r,\n" +
            "(SELECT entry.user_id AS id, max(entry.count) as count, room.game_type as gameType\n" +
            "FROM room JOIN game\n" +
            "ON room.room_id = game.room_id\n" +
            "JOIN entry\n" +
            "ON game.game_id = entry.game_id\n" +
            "WHERE room.game_type = :gameType AND date_format(game.created_at, '%Y-%m-%d') < current_date\n" +
            "GROUP BY entry.user_id ORDER BY MAX(entry.count) DESC) AS todayBest) AS today, user\n" +
            "WHERE user.user_id = today.id AND user.user_id = :userId", nativeQuery = true)
    Optional<Integer> findRankingByUserId(@Param("gameType") Integer gameTpye, @Param("userId") Integer userId);

}
