package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.MailReq;
import com.calisthenics.homedong.api.service.MailService;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.net.UnknownHostException;

/**
 * Created by Seo Youngeun on 2021-07-28
 *
 * Email Test
 */
@Api(value = "메일 test API", tags = {"Mail"})
@RestController
@AllArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/api/mail")
    @ApiOperation(value = "이메일 전송 테스트", notes = "<strong>이메일</strong>를 통해 이메일 전송 테스트를 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "전송 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
    })
    public ResponseEntity sendMail(@RequestBody MailReq mailReq) throws UnknownHostException, MessagingException {
        mailService.sendAuthMail(mailReq.getEmail(), mailReq.getNickname());

        return new ResponseEntity(HttpStatus.OK);
    }
}