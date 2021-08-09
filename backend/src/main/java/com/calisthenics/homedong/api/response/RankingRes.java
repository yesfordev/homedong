package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Seo Youngeun on 2021-08-09
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("RankingResponse")
public class RankingRes {

    private int ranking;

    private String nickname;

    private int count;

    private String changeStatus;

    private int changeRanking;

    public RankingRes(Integer ranking, String nickname, int count) {
        this.ranking = ranking;
        this.nickname = nickname;
        this.count = count;
        this.changeStatus = "new";
        this.changeRanking = -1;
    }

}