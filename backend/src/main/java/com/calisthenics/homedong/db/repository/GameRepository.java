package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
}
