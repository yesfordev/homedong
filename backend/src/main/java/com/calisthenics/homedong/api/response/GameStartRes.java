package com.calisthenics.homedong.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Seo Youngeun on 2021-08-05
 *
 * 방장이 게임 시작 했을 때, 시작된 게임 id를 반환
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameStartRes {

    private Integer gameId;

}
