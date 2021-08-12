package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-04
 */
@Getter
@Setter
@AllArgsConstructor
@ApiModel("BadgeResponse")
public class BadgeRes {

    private List<BadgeDetail> badges = new ArrayList<>();

    @ApiModelProperty(name = "홈동킹 뱃지 - 팔뚝왕, 복근왕, 하체왕 다 땄을 때")
    private boolean homedongKing;

    public BadgeRes(int gameTypeCount) {
        for(int idx = 0; idx < gameTypeCount; idx++) {
            badges.add(new BadgeDetail(idx+1));
        }
        this.homedongKing = false;
    }

}