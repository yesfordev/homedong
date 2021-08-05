package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ApiModel("DailyCalendarResponse")
public class DailyCalendarRes {

    @ApiModelProperty(name = "운동 기록이 있는 날짜", example = "2021-08-03")
    private String date;

    @ApiModelProperty(name = "운동 기록 (운동을 한 기록이 없으면 -1)")
    private DailyCalendarDetail dailyRecord;

    public DailyCalendarRes(String date) {
        this.date = date;
        dailyRecord = new DailyCalendarDetail();
    }
}
