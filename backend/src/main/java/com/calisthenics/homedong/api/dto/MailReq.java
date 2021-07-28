package com.calisthenics.homedong.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Seo Youngeun on 2021-07-28
 */
@Getter
@Setter
@NoArgsConstructor
public class MailReq {
    private String address;
    private String title;
    private String message;
    private MultipartFile file;
}