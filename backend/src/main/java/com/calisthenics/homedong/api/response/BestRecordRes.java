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

    @ApiModelProperty(name = "최고 기록(-1이면 게임을 한번도 않나 것)", example = "300")
    private Integer bestRecord;

    @ApiModelProperty(name = "현재 랭킹(-1이면 현재 랭킹이 없다는 뜻 -> 해당 종목 게임을 한번도 안해서)", example = "54")
    private Integer ranking;

    public BestRecordRes(Integer gameType, Integer bestRecord) {
        this.gameType = gameType;
        this.bestRecord = bestRecord;
        this.ranking = -1;
    }
}
