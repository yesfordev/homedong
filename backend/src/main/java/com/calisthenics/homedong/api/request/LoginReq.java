package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Getter
@Setter
@ApiModel("LoginRequst")
public class LoginReq {

    @ApiModelProperty(name = "유저 email", example = "yesfordev@gmail.com")
    @NotNull(message = "email may not be empty")
    @Email(message = "이메일 형식이 아닙니다.")
    @Size(min = 3, max = 50)
    private String email;

    @ApiModelProperty(name = "유저 password", example = "yesyes")
    @NotNull(message = "password may not be empty")
    private String password;
}