package com.calisthenics.homedong.controller;

import com.calisthenics.homedong.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public void execMail(@RequestBody String email) {
        mailService.sendAuthMail(email);
    }
}