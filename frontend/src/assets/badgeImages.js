import beginner from './beginner.svg';
import intermediate from './intermediate.svg';
import advanced from './advanced.svg';

const squatBeginner = beginner;
const squatIntermediate = intermediate;
const squatAdvanced = advanced;
const sitUpBeginner = beginner;
const sitUpIntermediate = intermediate;
const sitUpAdvanced = advanced;
const pushUpBeginner = beginner;
const pushUpIntermediate = intermediate;
const pushUpAdvanced = advanced;
const homedongKing = advanced;

const badgeImages = {
  squat: {
    beginner: squatBeginner,
    intermediate: squatIntermediate,
    advanced: squatAdvanced,
  },
  sitUp: {
    beginner: sitUpBeginner,
    intermediate: sitUpIntermediate,
    advanced: sitUpAdvanced,
  },
  pushUp: {
    beginner: pushUpBeginner,
    intermediate: pushUpIntermediate,
    advanced: pushUpAdvanced,
  },
  homedongKing: {
    best: homedongKing,
  },
};

export default badgeImages;
