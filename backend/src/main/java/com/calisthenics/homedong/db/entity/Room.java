package com.calisthenics.homedong.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Entity
@Table(name = "room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {

    @Id
    @Column(name = "room_id", length = 50)
    private String roomId;

    @Column(name = "game_type")
    private Integer gameType;

    @Column(name = "is_public")
    private boolean isPublic;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "status", length = 10)
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Builder.Default
    @OneToMany(mappedBy = "room")
    private Set<Game> games = new LinkedHashSet<Game>();

}
