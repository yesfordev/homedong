package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@ApiModel("GameEndRequest")
public class GameEndReq {

    @ApiModelProperty(name = "진행된 게임 id", example = "7")
    @NotNull(message = "게임 id는 필수 입력 값입니다.")
    private Integer gameId;

    @ApiModelProperty(name = "게임에서 달성한 기록", example = "40")
    @NotNull(message = "갯수는 필수 입력 값입니다.")
    private Integer count;

}
