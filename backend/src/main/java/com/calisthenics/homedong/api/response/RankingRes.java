package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(name = "랭킹", example = "1")
    private Integer ranking;

    @ApiModelProperty(name = "사용자 닉네임", example = "yes")
    private String nickname;

    @ApiModelProperty(name = "총 갯수", example = "300")
    private int count;

    @ApiModelProperty(name = "이전 랭킹에 대한 상태 변화(new-신규, up-상승, down-하락, noChange-변동 없음)", example = "new")
    private String changeStatus;

    @ApiModelProperty(name = "변동 추이", example = "2")
    private int changeRanking;

    public RankingRes(Integer ranking, String nickname, int count) {
        this.ranking = ranking;
        this.nickname = nickname;
        this.count = count;
        this.changeStatus = "new";
        this.changeRanking = -1;
    }

}