package com.calisthenics.homedong.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-08-02
 */
@Getter
@Setter
@ApiModel("ChangePasswordRequst")
public class ChangePasswordReq {

    @ApiModelProperty(name = "변경할 유저 password", example = "yesyes")
    @NotNull
    @Size(min = 3, max = 100)
    private String changePassword;

}
