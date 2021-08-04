package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.db.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Repository
public interface EntryRepositry extends JpaRepository<Entry, Integer> {
}
