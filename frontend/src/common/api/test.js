const squatBeginner = 'squatBeginner';
const squatIntermediate = 'squatIntermediate';
const squatAdvanced = 'squatAdvanced';
const sitUpBeginner = 'sitUpBeginner';
const sitUpIntermediate = 'sitUpIntermediate';
const sitUpAdvanced = 'sitUpAdvanced';
const pushUpBeginner = 'pushUpBeginner';
const pushUpIntermediate = 'pushUpIntermediate';
const pushUpAdvanced = 'pushUpAdvanced';

// const badgeImages = {
//   squat: {
//     beginner: squatBeginner,
//     intermediate: squatIntermediate,
//     advanced: squatAdvanced,
//   },
//   sitUp: {
//     beginner: sitUpBeginner,
//     intermediate: sitUpIntermediate,
//     advanced: sitUpAdvanced,
//   },
//   pushUp: {
//     beginner: pushUpBeginner,
//     intermediate: pushUpIntermediate,
//     advanced: pushUpAdvanced,
//   },
//   homedongKing: 'HOMEDONGKING',
// };

const info = {
  squat: {
    beginner: true,
    intermediate: false,
    advanced: false,
  },
  sitUp: {
    beginner: false,
    intermediate: true,
    advanced: false,
  },
  pushUp: {
    beginner: false,
    intermediate: true,
    advanced: false,
  },
  homedongKing: true,
};

console.log(
  Object.entries(info).forEach(([key, value]) => {
    Object.entries(value).forEach(([level, b]) => {
      console.log(key, level, b);
    });
  })
);

// const level = ['beginner', 'intermediate', 'advanced'];
// const entries = Object.entries(info);
// console.log(entries);

// const badgesOwned = [];
// Object.entries(info).forEach(([exercise, detailInfo]) => {
//   if (detailInfo === true) {
//     badgesOwned.push([exercise, true]);
//   }
//   Object.entries(detailInfo).forEach(([level, value]) => {
//     if (value === true) {
//       badgesOwned.push([exercise, level]);
//     }
//   });
// });

// const userBadgeImages = badgesOwned.map((badgeOwned) => {
//   const [exercise, level] = badgeOwned;
//   if (exercise === 'homedongKing') {
//     return badgeImages[exercise];
//   }
//   return badgeImages[exercise][level];
// });

// console.log(userBadgeImages);

// const exercise = ['squat', 'sitUp', 'pushUp'];

// console.log(info, exercise, level);
// console.log(
//   squatBeginner,
//   squatIntermediate,
//   squatAdvanced,
//   sitUpBeginner,
//   sitUpIntermediate,
//   sitUpAdvanced,
//   pushUpBeginner,
//   pushUpIntermediate,
//   pushUpAdvanced
// );
