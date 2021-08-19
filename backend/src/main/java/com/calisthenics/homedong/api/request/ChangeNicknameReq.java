package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
    @Pattern(regexp = "^[0-9a-zA-Z가-힣]*$",
            message = "닉네임은 숫자, 영어, 한글만 가능합니다.")
    @Size(min = 1, max = 6)
    private String changeNickname;
}
