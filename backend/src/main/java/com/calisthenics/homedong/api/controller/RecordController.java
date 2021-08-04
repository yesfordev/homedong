package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.response.BadgeRes;
import com.calisthenics.homedong.api.response.BestRecordRes;
import com.calisthenics.homedong.api.service.RecordService;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 유저 관련 Controller
 */
@Api(value = "홈동 API", tags = {"Record"})
@Slf4j
@RestController
@RequestMapping("/api/record")
public class RecordController {
    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping("/best")
    @ApiOperation(value = "최고 기록 조회", notes = "<strong>토큰</strong>을 통해 사용자의 최고기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "최고기록 조회 성공"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<BestRecordRes>> getBestRecord() {
        return ResponseEntity.ok(recordService.getBestRecord());
    }

    @GetMapping("/badge")
    @ApiOperation(value = "뱃지 조회", notes = "<strong>토큰</strong>을 통해 사용자의 보윺 뱃지를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "뱃지 조회 성공"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<BadgeRes> getBadgeRecord() {
        return ResponseEntity.ok(recordService.getBadgeRecord());
    }

}