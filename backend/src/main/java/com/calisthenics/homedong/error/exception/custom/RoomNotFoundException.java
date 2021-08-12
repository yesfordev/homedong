package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.EntityNotFoundException;

public class RoomNotFoundException extends EntityNotFoundException {

    public RoomNotFoundException(String roomId) {
        super(roomId + " room is not found ");
    }
}
