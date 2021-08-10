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
    @NotNull(message = "변경할 닉네임은 필수 입력 값입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$")
    @Size(min = 1, max = 6, message = "변경할 닉네임은 1-6글자 까지만 가능합니다.")
    private String changeNickname;
}
