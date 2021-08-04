package com.calisthenics.homedong.db.repository;

import com.calisthenics.homedong.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * User Repository
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @EntityGraph(attributePaths = "roles")
    Optional<User> findOneWithRolesByEmail(String email);

    @EntityGraph(attributePaths = "roles")
    Optional<User> findOneWithRolesByEmailAndAuthKey(String email, String authKey);

    @EntityGraph(attributePaths = "roles")
    Optional<User> findOneWithRolesByEmailAndAuthStatus(String email, boolean authStatus);

    List<User> findAllByNickname(String nickname);

    Integer deleteByEmail(String email);

}
