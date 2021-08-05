package com.calisthenics.homedong.util;

import java.security.SecureRandom;
import java.util.Date;

/**
 * Created by Yeseul Kim on 2021.08.05
 *
 * 방 번호 난수 생성 Util
 */
public class RandomNumberUtil {

    final static private char[] charSet = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z' };
    final static private int setLength = charSet.length;

    public static String getRandomNumber() {
        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        for (int i = 0; i < 10; i++) {
            // 강력한 난수를 발생시키기 위해 SecureRandom을 사용
            sb.append(charSet[sr.nextInt(setLength)]);
        }

        return sb.toString();
    }
}
