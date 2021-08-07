package com.calisthenics.homedong.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class DailyCalendarDetail {

    private Integer gameType;

    private Integer record;

    public DailyCalendarDetail(Integer gameType) {
        this.gameType = gameType;
        this.record = -1;
    }

}