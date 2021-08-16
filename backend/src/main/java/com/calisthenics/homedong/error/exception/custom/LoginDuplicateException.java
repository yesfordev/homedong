package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Seo Youngeun on 2021-08-17
 *
 * 로그인 중복 에러
 */
public class LoginDuplicateException extends InvalidValueException {

    public LoginDuplicateException(String email) {
        super(email, ErrorCode.LOGIN_DUPLICATION);
    }

}
