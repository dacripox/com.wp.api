var reduce = require('async-reduce');



module.exports = {


  /**
   * raffleAlgorithm.js
   *
   * @description :: Server-side logic for raffle (random weighted list selection).
   */
  getFirstNElements: async (numElements, participations) => {
    function getRandom() {
      var sumOfWeights = participations.reduce(function (memo, participation) {
        return memo + participation.points;
      }, 0);
      var random = Math.floor(Math.random() * (sumOfWeights + 1));

      return function (participation) {
        random -= participation.points;
        return random <= 0;
      };
    }

    let winners = [];
    for (var i = 0; i < numElements; i++) {
      var participation = participations.find(getRandom());
      winners.push(participation);
      var indexToRemove = participations.indexOf(participation);
      participations.splice(indexToRemove,1);

    }
    return winners;
  }

}