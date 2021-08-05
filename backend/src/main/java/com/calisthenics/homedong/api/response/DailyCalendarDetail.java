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

    private Integer squat;

    private Integer sitUp;

    private Integer pushUp;

    public DailyCalendarDetail() {
        this.squat = -1;
        this.sitUp = -1;
        this.pushUp = -1;
    }

}