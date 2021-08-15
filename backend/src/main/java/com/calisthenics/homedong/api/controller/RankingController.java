package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.response.RankingRes;
import com.calisthenics.homedong.api.service.RankingService;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-08
 */
@Api(value = "메일 test API", tags = {"Mail"})
@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    private final RankingService rankingService;

    @Autowired
    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/game/{gameType}")
    @ApiOperation(value = "전체 랭킹 확인", notes = "<strong>토큰, 게임 타입, 갯수(현재 30개로 넣기)</strong>를 통해 전체 랭킹을 확인한다.")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "gameType", value = "조회가 필요한 게임 타입(1,2,3)", required = true, dataType = "Integer", paramType = "path"),
            @ApiImplicitParam(name = "limit", value = "랭킹 조회에 필요한 갯수(30개)", required = true, dataType = "Integer", paramType = "query")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<RankingRes>> getRanking(@PathVariable(required = true) Integer gameType, @RequestParam(required = true) Integer limit) {
        return ResponseEntity.ok(rankingService.getRanking(gameType, limit));
    }

}