package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Created by Seo Youngeun on 2021-08-03
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("BestRecordResponse")
public class BestRecordRes {

    @ApiModelProperty(name = "게임 종목(1: squat, 2: pushup, 3: burpee)", example = "1")
    private Integer gameType;

    @ApiModelProperty(name = "최고 기록", example = "300")
    private Integer bestRecord;

}
