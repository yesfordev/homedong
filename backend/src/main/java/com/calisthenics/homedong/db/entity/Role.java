package com.calisthenics.homedong.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Entity
@Table(name = "role")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @JsonIgnore
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(name = "role_name", length = 50)
    private String roleName;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "user_role",
//            joinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "role_id")},
//            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")})
//    private Set<User> users = new HashSet<>();
}