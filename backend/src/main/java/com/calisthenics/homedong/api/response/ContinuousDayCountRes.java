package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ApiModel("DailyCalendarResponse")
public class ContinuousDayCountRes {

    private Date fromDate;

    private Date toDate;

    private Integer duration;

    private boolean workToday;

}
