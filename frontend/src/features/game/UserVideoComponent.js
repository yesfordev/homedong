/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import profileImages from '../../assets/profile/profileImages';

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nickname = styled.div`
  text-align: center;
  position: absolute;
  width: auto;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const Image = styled.img`
  width: 40%;
  position: absolute;
  bottom: 10%;
`;

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    console.log(this.props.userImg, '이미지들어왔냐~~', profileImages);
    return (
      <div style={{ position: 'relative' }}>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Nickname>{this.getNicknameTag()}</Nickname>
            {!this.props.currentVideo && (
              <Image src={profileImages[this.props.userImg - 1]} alt="User" />
            )}
          </StreamComponent>
        ) : (
          123
        )}
      </div>
    );
  }
}

// .videocontainer

// display: flex;
// justify-content: center;
// flex-wrap: wrap;
// /* height: 33vh; */

// .session

// display: flex;
// justify-content: center;

// .stream container

// display: flex;
// justify-content: center;
// width: 33%;
