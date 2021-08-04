package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Created by Seo Youngeun on 2021-08-04
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ApiModel("BadgeResponse")
public class BadgeRes {

    @ApiModelProperty(name = "스쿼트 보유 뱃지(beginner - 잔근육(다리), intermediate - 실전근육(다리), advanced - 하체왕")
    private BadgeDetailRes squat;

    @ApiModelProperty(name = "윗몸일으키기 보유 뱃지(beginner - 잔근육(복근), intermediate - 실전근육(복근), advanced - 복근왕")
    private BadgeDetailRes sitUp;

    @ApiModelProperty(name = "푸쉬업 보유 뱃지(beginner - 잔근육(팔), intermediate - 실전근육(팔), advanced - 팔뚝왕")
    private BadgeDetailRes pushUp;

    @ApiModelProperty(name = "홈동킹 뱃지 - 팔뚝왕, 복근왕, 하체왕 다 땄을 때")
    private boolean homedongKing;

    public BadgeRes() {
        this.squat = new BadgeDetailRes();
        this.sitUp = new BadgeDetailRes();
        this.pushUp = new BadgeDetailRes();
        this.homedongKing = false;
    }
}