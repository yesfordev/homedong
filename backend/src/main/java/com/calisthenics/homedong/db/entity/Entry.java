package com.calisthenics.homedong.db.entity;

import lombok.*;

import javax.persistence.*;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Entity
@Table(name = "entry")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Entry {

    @Id
    @Column(name = "entry_id")
    private Integer entryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="game_id")
    private Game game;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "count")
    private Integer count;

}
