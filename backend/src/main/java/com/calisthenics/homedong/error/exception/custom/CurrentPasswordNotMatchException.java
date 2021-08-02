package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Seo Youngeun on 2021-08-02
 */
public class CurrentPasswordNotMatchException extends InvalidValueException {

    public CurrentPasswordNotMatchException(String email) {
        super(email, ErrorCode.CURRENT_PASSWORD_NOT_MATCH_EXCEPTION);
    }
}
