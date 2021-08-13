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
    beginner: [squatBeginner, false],
    intermediate: [squatIntermediate, false],
    advanced: [squatAdvanced, false],
  },
  burpee: {
    beginner: [burpeeBeginner, false],
    intermediate: [burpeeIntermediate, false],
    advanced: [burpeeAdvanced, false],
  },
  pushUp: {
    beginner: [pushupBeginner, false],
    intermediate: [pushupIntermediate, false],
    advanced: [pushupAdvanced, false],
  },
  homedongKing: {
    best: [homedongKing, false],
  },
};

export default badgeImages;
