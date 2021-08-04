package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

/**
 * Created by Seo Youngeun on 2021-08-04
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ApiModel("BadgeDetailResponse")
public class BadgeDetailRes {

    private boolean beginner;

    private boolean intermediate;

    private boolean advanced;

    public BadgeDetailRes() {
        this.beginner = false;
        this.intermediate = false;
        this.advanced = false;
    }
}