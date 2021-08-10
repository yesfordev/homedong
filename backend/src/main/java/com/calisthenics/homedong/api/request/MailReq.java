package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Seo Youngeun on 2021-08-10
 */
@Getter
@Setter
@ApiModel("MailRequest")
public class MailReq {

    private String email;

    private String nickname;

}
