package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel("GameStartResponse")
public class GameStartRes {

    @ApiModelProperty(name = "현재 시작된 게임 id")
    private Integer gameId;

}
