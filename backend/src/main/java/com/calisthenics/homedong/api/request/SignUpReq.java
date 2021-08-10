package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Getter
@Setter
@ApiModel("SignUpRequest")
public class SignUpReq {

    @ApiModelProperty(name="유저 email")
    @NotNull(message = "이메일은 필수 입력 값입니다.")
    @Email
    @Pattern(regexp = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+$",
            message = "이메일 형식에 맞지 않습니다.")
    @Size(max = 50)
    private String email;

    @ApiModelProperty(name="유저 password")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
            message = "비밀번호는 영문자와 숫자, 특수문자가 적어도 1개 이상 포함된 8자~16자의 비밀번호여야 합니다.")
    @Size(min = 8, max = 16)
    private String password;

    @ApiModelProperty(name="유저 nickname")
    @NotNull(message = "닉네임은 필수 입력 값입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$")
    @Size(min = 1, max = 6, message = "닉네임은 1-6글자 까지만 가능합니다.")
    private String nickname;

}