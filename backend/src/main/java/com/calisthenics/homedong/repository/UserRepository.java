package com.calisthenics.homedong.repository;

import com.calisthenics.homedong.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @EntityGraph(attributePaths = "roles")
    Optional<User> findOneWithRolesByEmail(String email);
}
