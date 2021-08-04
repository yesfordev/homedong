package com.calisthenics.homedong.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Getter
@Setter
@ApiModel("SignUpRequest")
public class SignUpReq {

    @ApiModelProperty(name="유저 email")
    @NotNull
    @Size(min = 3, max = 50)
    private String email;

    @ApiModelProperty(name="유저 password")
    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @ApiModelProperty(name="유저 nickname")
    @NotNull
    @Size(min = 2, max = 10)
    private String nickname;

}