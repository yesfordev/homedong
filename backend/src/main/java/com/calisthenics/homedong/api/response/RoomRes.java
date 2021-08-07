package com.calisthenics.homedong.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Created by Yeseul Kim on 2021.07.05
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("RoomResponse")
public class RoomRes {
    //token, roomId, gameType, nickname

    @ApiModelProperty(name = "세션 관련 token", example = "wss://demos.openvidu.io?sessionId=ses_EtBjWA2tzI&token=tok_HLcEvbTdNnf4t7gO")
    private String token;

    @ApiModelProperty(name = "방 번호", example = "KUXY0XR9B5")
    private String roomId;

    @ApiModelProperty(name = "게임 타입", example = "1")
    private Integer gameType;

    @ApiModelProperty(name = "닉네임", example = "ysys")
    private String nickname;


}
