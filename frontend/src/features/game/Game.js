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
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios1 from '../../common/api/http-common';
import Navbar from '../../common/navbar/Navbar';
import butimg from '../../assets/chatbox-icon.svg';
import { quickStart } from '../home/homeSlice';

import './Game.css';
import './UserVideo.css';
import Messages from './components/Messages';
import startsound from './sound/start.mp3';
import gamemusic1 from './sound/gamemusic1.mp3';
import gamemusic2 from './sound/gamemusic2.mp3';
import gamemusic3 from './sound/gamemusic3.mp3';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://i5a608.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

// 전체 컨테이너
const Wrapper = styled.div`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 100vh;
  width: 100%;
`;
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
      maxPrediction: undefined,
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
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
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
  }

  componentDidMount() {
    music.currentTime = 0;
    setTimeout(() => {
      const { home } = this.props;
      const { token, roomId, nickname, gameType } = home;
      this.setState({
        token,
        mySessionId: roomId,
        myUserName: nickname,
        gametype: gameType,
      });
      console.log(`asdfasdfadsfadsf${this.state.mySessionId}`);
      this.joinSession();
    }, 500);
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    this.leaveSession();
    music.pause();
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
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
          console.log(this.state.sortedrank);
          this.setState({ rankdata: [] });
          this.state.sortedrank.forEach((item, index) => {
            console.log(index);
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
          Authorization: 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU',
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
      this.setState({ started: false, timer: true });
      music.loop = true;
      music.play();
      this.init();
    }, 5000);
    setTimeout(() => {
      this.setState({ readystate: 'start' });
    }, 3000);
    this.setState({
      started: true,
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
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    console.log(this.state.token);
    axios1.put('/api/rooms', {
      roomId: this.state.mySessionId,
    });
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: `Participant${Math.floor(Math.random() * 100)}`,
      mainStreamManager: undefined,
      publisher: undefined,
    });
    this.props.history.push('/');
  }

  // 티처블 머신
  async init() {
    console.log(`teachablemachinestart${this.state.gametype}`);
    switch (this.state.gametype) {
      case 1:
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/RmHPFT0M2/',
        });
        break;
      case 2:
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/j1ifbpLKk/',
        });
        break;
      case 3:
        this.setState({
          URL: 'https://teachablemachine.withgoogle.com/models/y1scUcaWN/',
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
    this.setState({
      maxPredictions: this.state.model.getTotalClasses(),
    });
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
        await this.pushUppredict();
        break;
      case 2:
        await this.burpeepredict();
        break;
      case 3:
        await this.squatpredict();
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
    if (prediction[0].probability.toFixed(2) > 0.99) {
      if (this.state.status === 'middle') {
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
            })
            .catch((error) => {
              console.error(error);
            });
          this.setState({ check: false });
        }
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.99) {
      this.setState({ status: 'middle' });
    } else if (prediction[2].probability.toFixed(2) > 0.99) {
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
    if (prediction[0].probability.toFixed(2) > 0.99) {
      if (this.state.status === 'middle') {
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
            })
            .catch((error) => {
              console.error(error);
            });
          this.setState({ check: false });
        }
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.99) {
      this.setState({ status: 'middle' });
    } else if (prediction[2].probability.toFixed(2) > 0.99) {
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
    if (prediction[0].probability.toFixed(2) > 0.99) {
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
          })
          .catch((error) => {
            console.error(error);
          });
        this.setState({ check: false });
      }
      this.setState({ status: 'up' });
    } else if (prediction[1].probability.toFixed(2) > 0.99) {
      this.setState({ status: 'down' });
      this.setState({ check: true });
    }
  }

  renderTableData() {
    return (
      this.state.rankdata &&
      this.state.rankdata.map((rank, index) => {
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
        const classes = useStyles;
        const bull = <span className={classes.bullet}>•</span>;
        const { nickname, count } = rank; // destructuring
        if (index < 3 && count > 0) {
          return (
            <li key={index}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {index + 1}위
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {nickname}님
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {count}개
                  </Typography>
                </CardContent>
              </Card>
            </li>
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

  render() {
    const mySessionId = this.state.mySessionId;
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
    const classes = useStyles;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <>
        <Navbar />
        <Wrapper>
          {this.state.timer ? (
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                duration={120}
                colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                onComplete={() => {
                  setTimeout(() => {
                    this.setState({
                      timer: false,
                    });
                    axios1.post('/api/game/end', {
                      count: this.state.count,
                      gameId: this.state.gameId,
                    });
                    music.pause();
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
                <div
                  className={this.state.started ? 'demo__text' : 'demo_text1'}
                >
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
              <div id="session-header">
                <h1 id="session-title">{mySessionId}</h1>
                <input
                  className="btn btn-large btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
                  value="Leave session"
                />
                {this.state.ishost ? (
                  <input
                    className="btn btn-large btn-danger"
                    type="button"
                    value="START GAME"
                    onClick={this.startButton}
                  />
                ) : null}
              </div>
              <div>개수</div>
              <div>{this.state.count}</div>
              <div className="rankingtable">
                <ul>{this.renderTableData()} </ul>
              </div>
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
      </>
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
});

// slice에 있는 actions(방찾기, 빠른 시작등등)을 사용하고 싶을 때
const mapDispatchToProps = (dispatch) => {
  return {
    // 빠른시작
    // quickStart는 import { quickStart } from './homeSlice'; 구문을 이용해서 action 가져온 것
    doQuickStart: (type) => dispatch(quickStart(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
