package com.calisthenics.homedong.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Yeseul Kim on 2021-08-06
 */

@Getter
@Setter
@ApiModel("LeaveRoomRequest")
public class LeaveRoomReq {

    @ApiModelProperty(name = "토큰", example="wss://localhost:4443?sessionId=ses_E0S5Tf1VCv&token=tok_PoTqZQ1K7loI37CM")
    @NotNull
    @Size(max = 50)
    private String token;

    @ApiModelProperty(name = "방 번호", example="QB8TKZC05P")
    @NotNull
    @Size(max = 50)
    private String roomId;
}
