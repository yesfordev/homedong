package com.calisthenics.homedong.api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Random;

/**
 * Created by Seo Youngeun on 2021-07-28
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;

    @Value("${server.port}")
    private String serverPort;

    //인증코드 난수 발생
    private String getAuthCode(int size) {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < size) {
            num = random.nextInt(10);
            buffer.append(num);
        }
        return buffer.toString();
    }

    public String sendAuthMail(String email) {
        String authKey = getAuthCode(6);

        try {
            String serverAddress = InetAddress.getLocalHost().getHostAddress();
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("회원가입 이메일 인증");
            message.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
                    .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
                    .append("<a href='http://" + serverAddress + ":" + serverPort + "/api/signup/confirm?email=")
                    .append(email)
                    .append("&authKey=")
                    .append(authKey)
                    .append("' target='_blank'>이메일 인증 확인</a>")
                    .toString());
            javaMailSender.send(message);
            log.info("메일 전송 성공");

            return authKey;
        } catch (UnknownHostException e) {
            log.error(e.getMessage());
            return "FAIL";
        }
    }
}