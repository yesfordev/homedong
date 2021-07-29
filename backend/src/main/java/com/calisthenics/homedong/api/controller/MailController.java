package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

/**
 * Created by Seo Youngeun on 2021-07-28
 *
 * Email Test
 */
@RestController
@AllArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/api/mail")
    public void execMail(@RequestBody String email)  {
        mailService.sendAuthMail(email);
    }
}