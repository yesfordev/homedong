package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.custom.AuthEmailSendFailException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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

    @Value("${custom.host}")
    private String serverAddress;

    //인증코드 난수 발생
    private String getAuthCode(int size) {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while (buffer.length() < size) {
            num = random.nextInt(75) + 48;
            if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
                buffer.append((char) num);
            } else {
                continue;
            }
        }
        return buffer.toString();
    }

    @Transactional
    public String sendAuthMail(String email, String nickname) throws MessagingException, UnknownHostException {
        String authKey = getAuthCode(6);

        StringBuffer emailcontent = new StringBuffer();
        emailcontent.append("<!DOCTYPE html>");
        emailcontent.append("<html>");
        emailcontent.append("<head>");
        emailcontent.append("</head>");
        emailcontent.append("<body>");
        emailcontent.append(
                " <div" 																																																	+
                "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 500px; height: 600px; border-top: 4px solid #FFD43A; margin: 100px auto; padding: 30px 0; box-sizing: border-box; color: #000000;\">"		+
//                "<style> img { display: block; margin: 0px auto; } </style>" +
                "<img src=\"https://user-images.githubusercontent.com/31542907/128824079-c8368805-bafa-4366-8f29-84bd3bc17251.png\" " +
                "style=\"margin: 0 auto; display: block;\" width=\"350\"/>" +
                "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400; text-align: center;\">"																															+
//                "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">HOMEDONG</span><br />"																												+
                "		<span style=\"color: #6A60A9; text-align: center;\">메일인증</span> 안내입니다."																																				+
                "	</h1>\n"																																																+
                "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px; color: #000000;\">"																													+
                nickname + " ( " + email + " ) "																																																+
                "		님 안녕하세요.<br />"																																													+
                "		HOMEDONG에 가입해 주셔서 진심으로 감사드립니다.<br />"																																						+
                "		아래 <b style=\"color: #6A60A9\">'메일 인증'</b> 버튼을 클릭하여 회원가입을 완료해 주세요.<br />"																													+
                "		감사합니다."																																															+
                "	</p>"																																																	+
                "	<a style=\"color: #FFF; text-decoration: none; text-align: center;\""																																	+
                "	href=\"" + serverAddress + "/api/signup/confirm?email=" + email + "&authKey=" + authKey + "\" target=\"_blank\">"														+
                "<div style=\"margin: 0 auto;\">" +
                "		<p"																																																	+
                "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 50px; background: #6A60A9; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                "			메일 인증</p>" +
                "</div>"+
                "	</a>"																																																	+
                "	<div style=\"border-top: 1px solid #FFD43A; padding: 5px;\"></div>"																																		+
                " </div>"
        );
        emailcontent.append("</body>");
        emailcontent.append("</html>");

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("HOMEDONG");
        helper.setTo(email);
        helper.setSubject("[HOMEDONG - 회원가입 이메일 인증]");
        helper.setText(emailcontent.toString(), true);

        javaMailSender.send(mimeMessage);

        return authKey;
    }

}