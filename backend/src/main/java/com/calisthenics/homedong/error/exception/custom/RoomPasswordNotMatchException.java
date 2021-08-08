package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.ErrorCode;
import com.calisthenics.homedong.error.exception.InvalidValueException;

/**
 * Created by Yeseul Kim on 2021-08-08
 */
public class RoomPasswordNotMatchException extends InvalidValueException {

    public RoomPasswordNotMatchException(String roomId) { super(roomId, ErrorCode.ROOM_PASSWORD_NOT_MATCH); }
}
