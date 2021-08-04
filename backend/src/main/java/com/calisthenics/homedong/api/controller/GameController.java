package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.response.GameStartRes;
import com.calisthenics.homedong.api.service.GameService;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PutMapping("/start")
    @ApiOperation(value = "방장이 게임 시작할 때 사용", notes = "<strong>게임시작</strong>을 통해 방 status를 GAME으로 업데이트하고, 시작된 게임의 game_id를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게임 시작 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<GameStartRes> startGame(@RequestParam(required = true) String roomId) {
        return ResponseEntity.ok(gameService.startGame(roomId));
    }

}
