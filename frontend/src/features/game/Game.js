/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-concat */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable default-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React, { Component, createRef, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// style
import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import { Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  IoMicSharp,
  IoMicOffSharp,
  IoVideocamOff,
  IoVideocam,
} from 'react-icons/io5';
import axios1 from '../../common/api/http-common';
import butimg from '../../assets/chatmsg.svg';
import { quickStart } from '../home/homeSlice';
import logo from '../../assets/logo(basic).svg';
import './Game.css';
import './UserVideo.css';
import Messages from './components/Messages';
import startsound from './sound/start.mp3';
import gamemusic2 from './sound/gamemusic2.mp3';
import badgeImages from '../../assets/badges/badgeImages';

// features
import UserVideoComponent from './UserVideoComponent';

// actions
import {
  saveNewBadges,
  loadBadgesOwned,
  resetMyPageInfo,
} from '../mypage/mypageSlice';

const OPENVIDU_SERVER_URL = 'https://i5a608.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'HOMEDONG';

const Sbutton = styled.button`
  background: linear-gradient(45deg, #ff859f 30%, #ffa87a 70%);
  border-radius: 7px;
  border: 0;
  fontweight: bold;
  color: white;
  height: 40px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  &:hover {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 70%);
  }
`;
// 전체 컨테이너
const useStyles = makeStyles({
  root: {
    minWidth: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const Wrapper = styled.div`
  display: flex;
  padding: 0px 0px 0px 0px;
  height: 100vh;
  width: 100%;
`;
const NavWrapper = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 0.5);
`;
const HeaderWrapper = styled.div`
  margin: 0 2em 0 2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100px;
`;
const Buttons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 20px;
    margin-left: 20px;
  }
`;
const LeftList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  & > * {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

// modal
const RankDialog = styled(Dialog)`
  opacity: 0.97;
  padding: 0 50px 0 100px;
  & .MuiPaper-rounded {
    border-radius: 15px;
  }
`;

const RankDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  background-color: rgba(106, 96, 169, 0.5);
  padding-bottom: 0;

  & > .MuiTypography-root {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 2rem;
  color: white;
  margin-bottom: 40px;
`;

const CancelButton = styled(CgClose)`
  cursor: pointer;
  color: white;
  justify-self: flex-end;
`;

const RankDialogContent = styled(DialogContent)`
  display: flex;
  color: white;
  flex-direction: column;
  background-color: rgba(106, 96, 169, 0.5);
`;

const RankDialogContentText = styled(DialogContentText)``;

const RankDialogActions = styled(DialogActions)`
  flex-direction: row;
`;

const RankRecordContainer = styled(Table)`
  color: white;
  display: flex;
`;

const CustomTableCell = styled(TableCell)`
  font-size: 1.2rem;
`;

const BadgesContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badges = styled.div`
  display: flex;
  justify-content: center;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled.img`
  width: 100px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const BodyTableCell = styled(TableCell)`
  font-size: 1.5rem;
`;
const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

const music = new Audio(gamemusic2);
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: undefined,
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      started: false,
      readystate: 'ready',
      gametype: 'pushUp',
      status: 'up',
      check: false,
      count: 0,
      webcam: undefined,
      model: undefined,
      URL: undefined,
      ranking: new Map(),
      sortedrank: new Map(),
      rankdata: undefined,
      messages: [],
      chaton: false,
      message: '',
      ishost: false,
      timer: false,
      gameId: undefined,
      token: undefined,
      audiostate: true,
      videostate: true,
      headerText: '',
      arrow: false,
      leaved: false,
      isRankModalOpen: false,
      startbuttonstate: true,
      finalRank: [],
      isFliped: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.startButton = this.startButton.bind(this);
    this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
    this.init = this.init.bind(this);
    this.pushUppredict = this.pushUppredict.bind(this);
    this.squatpredict = this.squatpredict.bind(this);
    this.burpeepredict = this.burpeepredict.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    // ref
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.closeRankModal = this.closeRankModal.bind(this);
  }

  componentDidMount() {
    this.props.doResetMyPageInfo();
    window.addEventListener('beforeunload', () => {
      this.componentWillUnmount();
    });
    music.currentTime = 0;
    setTimeout(() => {
      const { home } = this.props;
      const { token, roomId, nickname, gameType } = home;
      if (roomId === '') {
        this.props.history.push('/error');
      }
      this.setState({
        token,
        mySessionId: roomId,
        myUserName: nickname,
        gametype: gameType,
      });
      switch (gameType) {
        case 1:
          this.setState({ headerText: roomId + '/스쿼트' });
          break;
        case 3:
          this.setState({ headerText: roomId + '/버피' });
          break;
        case 2:
          this.setState({ headerText: roomId + '/팔굽혀펴기' });
          break;
      }
      console.log(`teachablemachinestart${this.state.gametype}`);
      this.setmodel();
      this.joinSession();
    }, 500);
  }

  componentWillUnmount() {
    music.pause();
    if (!this.state.leaved) {
      this.leaveSession();
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: 'messages__item--operator',
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: 'chat',
    });

    this.setState({
      message: '',
    });
  }

  sendmessageByEnter(e) {
    if (e.key === 'Enter') {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: 'messages__item--operator',
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: 'chat',
      });

      this.setState({
        message: '',
      });
    }
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers,
          });
        });
        mySession.on('signal:start', (event) => {
          this.setState({ gameId: event.data });
          this.start();
        });
        mySession.on('signal:count', (event) => {
          let countdata = event.data.split(',');
          this.state.ranking.set(countdata[0], countdata[1]);
          this.setState({
            sortedrank: new Map(
              [...this.state.ranking.entries()].sort((a, b) => b[1] - a[1])
            ),
          });
          this.setState({ rankdata: [] });
          this.state.sortedrank.forEach((item, index) => {
            this.state.rankdata = [
              ...this.state.rankdata,
              { nickname: index, count: item },
            ];
          });
          this.renderTableData();
        });
        mySession.on('signal:chat', (event) => {
          let chatdata = event.data.split(',');
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: 'messages__item--visitor',
                },
              ],
            });
          }
        });
        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          console.log('somoneout');
          // Remove the stream from 'subscribers' array
          this.updateHost().then((clientData) => {
            const host = JSON.parse(clientData).clientData;
            console.log(`************${host}`);
            mySession
              .signal({
                data: host,
                to: [],
                type: 'update-host',
              })
              .then(() => {
                console.log('Message successfully sent');
              })
              .catch((error) => {
                console.error(error);
              });
          });
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on('signal:update-host', (event) => {
          if (this.state.myUserName === event.data) {
            this.setState({ ishost: true });
          }
        });
        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend

        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              this.updateHost().then((firstUser) => {
                const host = JSON.parse(firstUser).clientData;
                console.log(`===========>first${host}`);
                if (this.state.myUserName === host)
                  this.setState({ ishost: true });
              });
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher,
              });
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  // 오픈비두 API를 사용해 현재 방의 참가자 정보 획득(session 필요)
  // 일단은 CORS 때문에 'Access-Control-Allow-Origin'으로 해결했으나 실제로 구현할 땐..?
  updateHost() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${'https://i5a608.p.ssafy.io:8443/api/sessions/'}${
          this.state.mySessionId
        }/connection`,
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST',
        },
        success: (response) => {
          console.log(
            '***********************response************************'
          );
          let content = response.content;
          content.sort((a, b) => a.createdAt - b.createdAt);
          console.log(content);
          console.log(`===============>whofirst${content[0].clientData}`);
          resolve(content[0].clientData);
        },
        error: (error) => reject(error),
      });
    });
  }

  // 게임시작
  start() {
    new Audio(startsound).play();
    setTimeout(() => {
      this.setState({
        started: false,
        timer: true,
        count: 0,
        status: 'up',
        ranking: new Map(),
        sortedrank: new Map(),
        readystate: 'ready',
      });
      music.loop = true;
      music.play();
      this.setState({
        arrow: true,
      });
      this.init();
    }, 5000);
    setTimeout(() => {
      this.setState({ readystate: 'start' });
    }, 3000);
    this.setState({
      started: true,
      startbuttonstate: false,
    });
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }

  startButton() {
    let mySession = this.state.session;
    axios1
      .put(`/api/game/start?roomId=${this.state.mySessionId}`)
      .then((response) => {
        mySession.signal({
          data: response.data.gameId,
          type: 'start',
        });
      });
  }

  // 시작버튼
  leaveSession() {
    console.log('난 떠나요');
    console.log(this.state.mySessionId);
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    axios1
      .put('/api/rooms', {
        roomId: this.state.mySessionId,
      })
      .then(() => {
        // Empty all properties...
        this.OV = null;
        this.setState({
          leaved: true,
          session: '',
          subscribers: [],
          mySessionId: 'SessionA',
          myUserName: `Participant${Math.floor(Math.random() * 100)}`,
          mainStreamManager: undefined,
          publisher: undefined,
        });
        console.log(this.state.leaved);
        this.props.history.push('/');
      });
  }

  async setmodel() {
    switch (this.state.gametype) {
      case 2: // 푸쉬업
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/2XrVxIc_1/',
        });
        break;
      case 3: // 버피
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/j1ifbpLKk/',
        });
        break;
      case 1: // 스쿼트
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/JCxTWXNy4/',
        });
        break;
    }
    const modelURL = `${this.state.URL}model.json`;
    const metadataURL = `${this.state.URL}metadata.json`;
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    this.setState({
      model: await tmPose.load(modelURL, metadataURL),
    });
  }

  // 티처블 머신
  async init() {
    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    this.setState({ webcam: new tmPose.Webcam(size, size, flip) }); // width, height, flip
    await this.state.webcam.setup(); // request access to the webcam
    await this.state.webcam.play();
    window.requestAnimationFrame(this.loop);
  }

  async loop(timestamp) {
    this.state.webcam.update(); // update the webcam frame
    switch (this.state.gametype) {
      case 1:
        await this.squatpredict();
        break;
      case 3:
        await this.burpeepredict();
        break;
      case 2:
        await this.pushUppredict();
        break;
    }

    window.requestAnimationFrame(this.loop);
  }

  async pushUppredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) > 0.95) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        this.state.session
          .signal({
            data: `${this.state.myUserName},${this.state.count}`, // Any string (optional)
            to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'count', // The type of message (optional)
          })
          .then(() => {
            console.log('Message successfully sent');
            this.setState({ check: false });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.95) {
      this.setState({ status: 'down' });
      this.setState({ check: true });
    }
  }

  async squatpredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) > 0.95) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        this.state.session
          .signal({
            data: `${this.state.myUserName},${this.state.count}`, // Any string (optional)
            to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'count', // The type of message (optional)
          })
          .then(() => {
            console.log('Message successfully sent');
            this.setState({ check: false });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.95) {
      this.setState({ status: 'down' });
      this.setState({ check: true });
    }
  }

  async burpeepredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) > 0.95) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        this.state.session
          .signal({
            data: `${this.state.myUserName},${this.state.count}`, // Any string (optional)
            to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'count', // The type of message (optional)
          })
          .then(() => {
            console.log('Message successfully sent');
            this.setState({ check: false });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.95) {
      this.setState({ status: 'down' });
      this.setState({ check: true });
    }
  }

  renderTableData() {
    return (
      this.state.rankdata &&
      this.state.rankdata.map((rank, index) => {
        const { nickname, count } = rank; // destructuring
        let finalRanking;
        if (index === 0) {
          finalRanking = '🥇';
        } else if (index === 1) {
          finalRanking = '🥈';
        } else if (index === 2) {
          finalRanking = '🥉';
        }
        if (index < 3) {
          return (
            <tr key={index}>
              <td className="tableitem">{finalRanking}</td>
              <td className="tableitem">{nickname}님</td>
              <td className="tableitem">{count}개</td>
            </tr>
          );
        }
      })
    );
  }

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = { ...response };
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                  `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
              )
            ) {
              window.location.assign(
                `${OPENVIDU_SERVER_URL}/accept-certificate`
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  closeRankModal() {
    this.setState({ isRankModalOpen: false });
  }

  render() {
    const classes = useStyles;
    const renderTime = ({ remainingTime }) => {
      if (remainingTime === 0) {
        return <div className="timer">Too lale...</div>;
      }

      return (
        <div className="timer">
          <div className="text">Remaining</div>
          <div className="value">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      );
    };
    const messages = this.state.messages;
    const bull = <span className={classes.bullet}>•</span>;
    const { mypage } = this.props;
    const { badgesOwned } = mypage;

    return (
      <Wrapper>
        <NavWrapper>
          <HeaderWrapper>
            <Link to="/">
              <Logo src={logo} />
            </Link>
            <LeftList>
              <span>{this.state.headerText}</span>
            </LeftList>
            <Buttons>
              {this.state.audiostate ? (
                <IoMicSharp
                  color="#9FA9D8"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                />
              ) : (
                <IoMicOffSharp
                  color="#50468c"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                />
              )}
              {this.state.videostate ? (
                <IoVideocam
                  color="#9FA9D8"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                />
              ) : (
                <IoVideocamOff
                  color="#50468c"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                />
              )}

              {this.state.ishost && this.state.startbuttonstate ? (
                <Sbutton
                  className={classes.button}
                  type="primary"
                  onClick={this.startButton}
                >
                  게임시작
                </Sbutton>
              ) : null}
              <Sbutton
                className={classes.button}
                type="primary"
                onClick={this.leaveSession}
              >
                나가기
              </Sbutton>
            </Buttons>
          </HeaderWrapper>
        </NavWrapper>
        {/* <Button onClick={() => this.setState({ isRankModalOpen: true })}>
          랭킹
        </Button> */}
        <RankDialog
          fullWidth
          open={this.state.isRankModalOpen}
          onClose={() => this.closeRankModal()}
          TransitionComponent={Transition}
          aria-labelledby="form-dialog-title"
        >
          <RankDialogTitle c id="form-dialog-title">
            <Title>랭킹</Title>
          </RankDialogTitle>
          <RankDialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell align="center"> 순위 </CustomTableCell>
                    <CustomTableCell align="center"> 닉네임 </CustomTableCell>
                    <CustomTableCell align="center"> 개수 </CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.finalRank.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <BodyTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {index + 1 === 1 && '🥇'}
                          {index + 1 === 2 && '🥇'}
                          {index + 1 === 3 && '🥉'}
                          {index + 1 >= 4 && index + 1}
                        </BodyTableCell>
                        <BodyTableCell align="center">
                          {item.nickname}
                        </BodyTableCell>
                        <BodyTableCell align="center">
                          {item.count}
                        </BodyTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <BadgesContainer>
              {badgesOwned.length !== 0 && (
                <Title>뱃지를 획득하셨습니다! 🏆</Title>
              )}
              <Badges>
                {badgesOwned &&
                  badgesOwned.map((badge) => {
                    const [kind, level] = badge;
                    console.log(kind, level);
                    return (
                      <BadgeContainer>
                        <Badge src={badgeImages[kind][level][0]} />
                        <span>{badgeImages[kind][level][2]}</span>
                      </BadgeContainer>
                    );
                  })}
              </Badges>
            </BadgesContainer>
            <RankDialogActions>
              <CancelButton
                onClick={() => {
                  this.closeRankModal();
                }}
              />
            </RankDialogActions>
          </RankDialogContent>
        </RankDialog>
        {this.state.arrow ? (
          <div
            className={`arrow-container ${this.state.check ? 'rotate' : ''}`}
          >
            <div className="chevron" />
            <div className="chevron" />
            <div className="chevron" />
          </div>
        ) : null}
        {this.state.timer ? (
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={30}
              colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
              onComplete={() => {
                setTimeout(() => {
                  if (this.state.rankdata) {
                    this.setState({
                      finalRank: [...this.state.rankdata],
                    });
                  }
                  this.setState({
                    ranking: new Map(),
                    sortedrank: new Map(),
                    rankdata: [],
                    timer: false,
                    arrow: false,
                    status: 'up',
                    startbuttonstate: true,
                  });
                  setTimeout(() => {
                    this.setState({
                      isRankModalOpen: true,
                    });
                  }, 700);
                  axios1
                    .post('/api/game/end', {
                      count: this.state.count,
                      gameId: this.state.gameId,
                    })
                    .then((res) => {
                      this.props.doSaveNewBadges(res.data);
                      this.props.doLoadBadgesOwned();
                    });
                  music.pause();
                  this.renderTableData();
                }, 300);
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        ) : null}
        {this.state.started ? (
          <div className="demo">
            <div
              className={
                this.state.started
                  ? 'demo__colored-blocks'
                  : 'demo__colored-blocks'
              }
            >
              <div
                className={
                  this.state.started
                    ? 'demo__colored-blocks-rotater'
                    : 'demo__colored-blocks-rotater1'
                }
              >
                <div className="demo__colored-block" />
                <div className="demo__colored-block" />
                <div className="demo__colored-block" />
              </div>
              <div className="demo__colored-blocks-inner" />
              <div className={this.state.started ? 'demo__text' : 'demo_text1'}>
                {this.state.readystate}
              </div>
            </div>
            <div className="demo__inner">
              <svg className="demo__numbers" viewBox="0 0 100 100">
                <defs>
                  <path className="demo__num-path-1" d="M40,28 55,22 55,78" />
                  <path
                    className="demo__num-join-1-2"
                    d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"
                  />
                  <path
                    className="demo__num-path-2"
                    d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"
                  />
                  <path
                    className="demo__num-join-2-3"
                    d="M28,69 Q25,44 34.4,27.4"
                  />
                  <path
                    className="demo__num-path-3"
                    d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"
                  />
                </defs>
                <path
                  className={
                    this.state.started
                      ? 'demo__numbers-path'
                      : 'demo__numbers-path1'
                  }
                  d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 
                       Q25,44 34.4,27.4
                       l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 
                       a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 
                       l0,-61 L40,28"
                />
              </svg>
            </div>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          <div id="session">
            <table
              id="ranking"
              className={`table ${this.state.arrow ? null : 'invisible'}`}
            >
              <tbody>{this.renderTableData()}</tbody>
            </table>
            <div id="video-container" className="video-container col-md-6">
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
            <div className="chatbox">
              {this.state.chaton ? (
                <div className="chat chatbox__support chatbox--active">
                  <div className="chat chatbox__header" />
                  <div className="chatbox__messages" ref="chatoutput">
                    {/* {this.displayElements} */}
                    <Messages messages={messages} />
                    <div />
                  </div>
                  <div className="chat chatbox__footer">
                    <input
                      id="chat_message"
                      type="text"
                      placeholder="Write a message..."
                      onChange={this.handleChatMessageChange}
                      onKeyPress={this.sendmessageByEnter}
                      value={this.state.message}
                    />
                    <p
                      className="chat chatbox__send--footer"
                      onClick={this.sendmessageByClick}
                    >
                      Send
                    </p>
                  </div>
                </div>
              ) : null}
              <div className="chatbox__button" ref={this.chatButton}>
                <button onClick={this.chattoggle}>
                  <img src={butimg} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Wrapper>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */
}
// authSlice, homeSlice 같이 redux(중앙집중 관리형)에서 전달받은 값을 사용하는 경우
const mapStateToProps = (state) => ({
  // homeSlice
  home: state.home,
  mypage: state.mypage,
});

// slice에 있는 actions(방찾기, 빠른 시작등등)을 사용하고 싶을 때
const mapDispatchToProps = (dispatch) => {
  return {
    // 빠른시작
    // quickStart는 import { quickStart } from './homeSlice'; 구문을 이용해서 action 가져온 것
    doQuickStart: (type) => dispatch(quickStart(type)),
    doSaveNewBadges: (resData) => dispatch(saveNewBadges(resData)),
    doLoadBadgesOwned: () => dispatch(loadBadgesOwned()),
    doResetMyPageInfo: () => dispatch(resetMyPageInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

//                   // return ( // <Order>{index + 1}위</Order>
// <Nickname>닉네임:{item.nickname}</Nickname>
// <Count>갯수:{item.count}</Count>
// );
