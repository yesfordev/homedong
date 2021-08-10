package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * Created by Seo Youngeun on 2021-08-02
 */
@Getter
@Setter
@ApiModel("ChangePasswordRequst")
public class ChangePasswordReq {

    @ApiModelProperty(name = "변경할 유저 password", example = "yesyes")
    @NotNull(message = "변경할 비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
            message = "비밀번호는 영문자와 숫자, 특수문자가 적어도 1개 이상 포함된 8자~16자의 비밀번호여야 합니다.")
    @Size(min = 8, max = 16)
    private String changePassword;

}
