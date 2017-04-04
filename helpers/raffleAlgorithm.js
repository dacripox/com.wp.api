let getRandom = (arrayList, sumOfWeights) => {
  var random = Math.floor(Math.random() * (sumOfWeights + 1));

  return function (arrayList) {
    random -= arrayList.weight;
    return random <= 0;
  };
}



async function getFirstNElements(numElements, arrayList){
    selectedElements = {};

    sumOfWeights = arrayList.reduce(function (memo, item) {
      return memo + item.points; //Change with the participant weight attribute (in our case, "points")
    }, 0);

    for (var i = 0; i < numElements; i++) {
      let item = getRandom(arrayList, sumOfWeights);
      selectedElements.push(item);
    }
 return selectedElements;
  }

module.exports = {


  /**
   * raffleAlgorithm.js
   *
   * @description :: Server-side logic for raffle (random weighted list selection).
   */
  getFirstNElements: getFirstNElements

}