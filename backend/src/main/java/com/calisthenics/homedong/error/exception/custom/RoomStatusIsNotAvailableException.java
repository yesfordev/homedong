package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.BusinessException;
import com.calisthenics.homedong.error.exception.ErrorCode;

/**
 * Created by Yeseul Kim on 2021-08-08
 */
public class RoomStatusIsNotAvailableException extends BusinessException {

    public RoomStatusIsNotAvailableException(String status) {
        super("Room Status is " + status, ErrorCode.ROOM_IS_NOT_AVAILABLE);
    }
}
