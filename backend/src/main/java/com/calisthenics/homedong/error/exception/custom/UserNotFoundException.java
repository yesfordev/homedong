package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {

    public UserNotFoundException(String email) {
        super(email + " user is not found");
    }
}
