package com.calisthenics.homedong.config.response;

import lombok.*;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenRes {
    private String token;
}