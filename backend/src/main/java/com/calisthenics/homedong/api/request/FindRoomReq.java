package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Yeseul Kim on 2021-08-05
 */

@Getter
@Setter
@ApiModel("FindRoomRequest")
public class FindRoomReq {

    @ApiModelProperty(name = "방 번호", example="QB8TKZC05P")
    @NotEmpty(message = "방 번호는 필수 입력 값입니다.")
    @Size(max = 50)
    private String roomId;

    @ApiModelProperty(name = "비밀번호", example="password")
    @NotNull(message = "방 비밀번호는 필수 입력 값입니다.")
    @Size(max = 50)
    private String password;
}
