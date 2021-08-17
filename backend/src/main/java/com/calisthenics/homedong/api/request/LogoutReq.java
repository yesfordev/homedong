package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Created by Seo Youngeun on 2021-08-17
 */
@Getter
@Setter
@ApiModel("LogoutRequest")
public class LogoutReq {

    @ApiModelProperty(name = "토큰", example="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZXNmb3JkZXZAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE2MzE3MTg4Mjh9.kKfYGes2WU6zZahSArRHNJji5nT6qYrtrnfPGgtD3-XGLGhAUjZ9oVaapHKOGz8Y32hLbZASb1uV5I0dSzu4mA")
    @NotNull(message = "token may not be empty")
    String token;

}
