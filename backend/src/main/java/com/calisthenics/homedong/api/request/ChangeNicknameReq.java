package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-08-02
 */
@Getter
@Setter
@ApiModel("ChangeNicknameRequst")
public class ChangeNicknameReq {

    @ApiModelProperty(name = "변경할 유저 nickname", example = "홈동짱")
    @NotNull(message = "changePassword may not be empty")
    @Size(min = 1, max = 6)
    private String changeNickname;
}
