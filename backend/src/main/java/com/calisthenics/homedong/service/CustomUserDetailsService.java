package com.calisthenics.homedong.service;

import com.calisthenics.homedong.entity.User;
import com.calisthenics.homedong.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * Spring Security에서 정말 중요한 부분. UserDetails를 다룸
 */
@Component("userDetailsService")
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email) {
//        return userRepository.findOneWithRolesByEmail(email)
        return userRepository.findOneWithRolesByEmailAndAuthStatus(email, true)
                .map(user -> createUser(email, user))
                .orElseThrow(() -> new UsernameNotFoundException(email + " -> 이메일 인증이 이루어지지 않았거나, 없는 사용자입니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String email, User user) {
        List<GrantedAuthority> grantedRoles = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                grantedRoles);
    }
}