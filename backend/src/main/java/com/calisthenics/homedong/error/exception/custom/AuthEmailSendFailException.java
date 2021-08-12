package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.BusinessException;
import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Seo Youngeun on 2021-07-29
 */
public class AuthEmailSendFailException extends InvalidValueException {

    public AuthEmailSendFailException(final String email) {
        super("To "+email+", auth email send fail ", ErrorCode.AUTH_EMAIL_SEND_FAIL);
    }
}
