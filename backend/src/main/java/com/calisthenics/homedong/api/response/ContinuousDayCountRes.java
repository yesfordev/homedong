package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.sql.Date;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ApiModel("ContinuousDayCountResponse")
public class ContinuousDayCountRes {

    @ApiModelProperty(name = "연속 운동 시작일 - 어제나 오늘까지 연속 운동일 없으면 null", example = "2021-08-01")
    private Date fromDate;

    @ApiModelProperty(name = "연속 운동 종료일 - 어제나 오늘까지 연속 운동일 없으면 null", example = "2021-08-05")
    private Date toDate;

    @ApiModelProperty(name = "연속 운동일 수 - 어제나 오늘까지 연속 운동일 없으면 0", example = "5")
    private Integer duration;

    @ApiModelProperty(name = "오늘 운동 했는지 여부", example = "true")
    private boolean workToday;

    public ContinuousDayCountRes() {
        this.duration = 0;
    }

}
