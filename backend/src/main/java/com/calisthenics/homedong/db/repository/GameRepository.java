package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.api.response.IContinuousDayCountRes;
import com.calisthenics.homedong.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    // 연속 운동일 수
    @Query(value = "SELECT MIN(date) AS fromDate, MAX(date) AS toDate, COUNT(*) AS duration, IF(MAX(date) = current_date(), true, false) AS workToday " +
            "FROM (SELECT *, " +
            "@rownum \\:= @rownum + 1 AS rownum, " +
            "DATE_SUB(date, INTERVAL @rownum day) AS groupDate " +
            "FROM (SELECT DISTINCT(CAST(created_at AS DATE)) AS date, entry.user_id " +
            "FROM game JOIN entry " +
            "ON game.game_id = entry.game_id " +
            "ORDER BY entry.user_id, CAST(game.created_at AS DATE)) as i) as t " +
            "WHERE t.user_id = :userId " +
            "GROUP BY groupDate " +
            "HAVING toDate = current_date() OR toDate = current_date() - interval 1 day " +
            "ORDER BY fromDate", nativeQuery = true)
    Optional<IContinuousDayCountRes> getContinuousDayCount(@Param("userId") Integer userId);


}
