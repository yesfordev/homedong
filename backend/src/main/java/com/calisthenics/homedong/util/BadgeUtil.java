package com.calisthenics.homedong.util;

import lombok.Getter;

/**
 * Created by Seo Youngeun on 2021-08-07
 */
@Getter
public enum BadgeUtil {
    SQUAT(1, 10, 20, 30),
    PUSHUP(2, 10, 15, 20),
    BURPEE(3, 5, 10, 15);

    private final Integer gameType;
    private final int beginner;
    private final int intermediate;
    private final int advanced;

    BadgeUtil(Integer gameType, int beginner, int intermediate, int advanced) {
        this.gameType = gameType;
        this.beginner = beginner;
        this.intermediate = intermediate;
        this.advanced = advanced;
    }

}
