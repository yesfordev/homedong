package com.calisthenics.homedong.error.exception.custom;

import com.calisthenics.homedong.error.exception.EntityNotFoundException;

public class DailyCalendarNotFoundException extends EntityNotFoundException {

    public DailyCalendarNotFoundException(String email) {
        super(email + " daily calendar Not Found");
    }
}
