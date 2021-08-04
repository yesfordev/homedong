package com.calisthenics.homedong.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Entity
@Table(name = "game")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Game {

    @Id
    @Column(name = "game_id")
    private Integer gameId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Builder.Default
    @OneToMany(mappedBy = "game")
    private Set<Entry> entries = new LinkedHashSet<Entry>();

}
