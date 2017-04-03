let getRandom = (arrayList, sumOfWeights) => {
  var random = Math.floor(Math.random() * (sumOfWeights + 1));

  return function (arrayList) {
    random -= arrayList.weight;
    return random <= 0;
  };
}



module.exports = {


  /**
   * raffleAlgorithm.js
   *
   * @description :: Server-side logic for raffle (random weighted list selection).
   */
  getFirstNElements: (numElements, arrayList) => {
    selectedElements = {};

    sumOfWeights = arrayList.reduce(function (memo, item) {
      return memo + item.weight;
    }, 0);

    for (var i = 0; i < numElements; i++) {
      let item = getRandom(arrayList, sumOfWeights);
      selectedElements.push(item);
    }
 return selectedElements;
  }

}