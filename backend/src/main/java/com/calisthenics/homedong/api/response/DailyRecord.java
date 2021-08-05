package com.calisthenics.homedong.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Seo Youngeun on 2021-08-05
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class DailyRecord {

    private String date;

    private String gameType;

    private Integer record;
}
