package com.calisthenics.homedong.api.response;

import java.sql.Date;

/**
 * Created by Seo Youngeun on 2021-08-05
 *
 * ContinuousDayCountRes Projection Interface
 */
public interface IContinuousDayCountRes {

    Date getFromDate();

    Date getToDate();

    Integer getDuration();

    Integer getWorkToday();

}
