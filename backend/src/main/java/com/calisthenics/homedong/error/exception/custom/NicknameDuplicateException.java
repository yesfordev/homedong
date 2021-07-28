package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.api.dto.SignUpReq;
import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Seo Youngeun on 2021-07-29
 */
public class NicknameDuplicateException extends InvalidValueException {
    public NicknameDuplicateException(final String nickname) {
        super(nickname, ErrorCode.NICKNAME_DUPLICATION);
    }
}
