// burpee
import burpeeBeginner from './burpeeBeginner.png';
import burpeeIntermediate from './burpeeIntermediate.png';
import burpeeAdvanced from './burpeeAdvanced.png';

// squat
import squatBeginner from './squatBeginner.png';
import squatIntermediate from './squatIntermediate.png';
import squatAdvanced from './squatAdvanced.png';

// pushup
import pushupBeginner from './pushupBeginner.png';
import pushupIntermediate from './pushupIntermediate.png';
import pushupAdvanced from './pushupAdvanced.png';

// homedongking
import homedongKing from './homedongking.png';

const badgeImages = {
  squat: {
    beginner: [squatBeginner, false, '잔근육(다리)'],
    intermediate: [squatIntermediate, false, '실전근육(다리)'],
    advanced: [squatAdvanced, false, '하체왕'],
  },
  burpee: {
    beginner: [burpeeBeginner, false, '잔근육(코어)'],
    intermediate: [burpeeIntermediate, false, '실전근육(코어)'],
    advanced: [burpeeAdvanced, false, '코어왕'],
  },
  pushUp: {
    beginner: [pushupBeginner, false, '잔근육(팔)'],
    intermediate: [pushupIntermediate, false, '실전근육(팔)'],
    advanced: [pushupAdvanced, false, '팔뚝왕'],
  },
  homedongKing: {
    best: [homedongKing, false, '홈동킹'],
  },
};

export default badgeImages;
