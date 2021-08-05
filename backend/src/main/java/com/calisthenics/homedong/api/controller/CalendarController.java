package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.response.DailyCalendarRes;
import com.calisthenics.homedong.api.service.CalenderService;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Api(value = "캘린더 API", tags = {"Calendar"})
@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalenderService calenderService;

    @Autowired
    public CalendarController(CalenderService calenderService) {
        this.calenderService = calenderService;
    }

    @GetMapping("/daily")
    @ApiOperation(value = "1일 1홈동 조회", notes = "<strong>토큰</strong>을 통해 사용자의 1일 1홈동을 조회한다. - 해당 달에 아무 데이터도 없는 경우도 고려해주기!(json array 형태로 안나옴 -> empty String)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "조회할 년도", required = true, dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "month", value = "조회할 달", required = true, dataType = "Integer", paramType = "query")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "1일 1홈동 조회 성공(데이터 없는 경우도)"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<DailyCalendarRes>> getDailyCalendar(@RequestParam(required = true) int year, @RequestParam(required = true) int month) {
        return ResponseEntity.ok(calenderService.getDailyCalendar(year, month));
    }

}
