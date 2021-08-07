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
public class BadgeDetail {

    private Integer gameType;

    private boolean beginner;

    private boolean intermediate;

    private boolean advanced;

    public BadgeDetail(int gameType) {
        this.gameType = gameType;
        this.beginner = false;
        this.intermediate = false;
        this.advanced = false;
    }
}