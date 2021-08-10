package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Yeseul Kim on 2021-08-05
 */

@Getter
@Setter
@ApiModel("MakeRoomRequest")
public class MakeRoomReq {

    @ApiModelProperty(name = "게임 타입(1,2,3)", example="1")
    @NotNull(message = "게임 타입은 필수 입력 값입니다.")
    private Integer gameType;

    @ApiModelProperty(name = "비밀번호", example="password")
    @NotNull(message = "비밀번호는 필수 입력 값입니다.")
    @Size(max = 50)
    private String password;
}
