package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.api.dto.SignUpReq;
import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Seo Youngeun on 2021-07-29
 */
public class EmailDuplicateException extends InvalidValueException {

    public EmailDuplicateException(final SignUpReq signUpReq) {
        super(signUpReq.getEmail(), ErrorCode.EMAIL_DUPLICATION);
    }
}
