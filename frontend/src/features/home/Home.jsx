import React, { Component } from 'react';
import styles from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../common/navbar/Navbar';
import Kind from './Kind';
import quickstart from '../../assets/quickstart.svg';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';
import { quickStart } from './homeSlice';

const Wrapper = styles.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextWrapper = styles.div`
  height: 20vh;
  display: flex;
  justify-content: center;
`;

const QuickImage = styles.img`
  width: 500px;
  height: 200px;
`;

const StartWrapper = styles.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const kindLists = [
  {
    source: pushup,
    title: '팔굽혀펴기',
    link: '/game',
  },
  {
    source: burpee,
    title: '버피',
    link: '/game',
  },
  {
    source: squat,
    title: '스쿼트',
    link: '/game',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { doQuickStart } = this.props;

    return (
      <>
        <Navbar />
        <Wrapper>
          <TextWrapper>
            <QuickImage src={quickstart} />
          </TextWrapper>
          <StartWrapper>
            {kindLists.map((kindList, index) => {
              return (
                <Link
                  to={kindList.link}
                  onClick={() => {
                    const data = { gameType: index };
                    doQuickStart(data).unwrap();
                  }}
                >
                  <Kind imgSrc={kindList.source} title={kindList.title} />
                </Link>
              );
            })}
          </StartWrapper>
        </Wrapper>
      </>
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
