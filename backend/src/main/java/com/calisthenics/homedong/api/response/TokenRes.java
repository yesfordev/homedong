package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("LoginTokenResponse")
public class TokenRes {
    @ApiModelProperty(name = "JWT 인증 토큰", example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String token;
}