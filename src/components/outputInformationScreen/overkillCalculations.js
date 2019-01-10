import math from 'mathjs'; // Library for working with big numbers //


math.config({            /////////////////////////////////
    number: "BigNumber", // Configure mathjs library ////
    precision: 200      // BigNumbers to 200 sigfigs ///
});                     ////////////////////////////////

/* The functions in this file serve to calculate the effects of overkill on
the damage per second a player can deal in oldschool runescape. Overkill just
refers to the times when a player deals more damage than an enemy has left
meaning that part of the hit was "wasted". This complicates calculating damage
per second or kills per hour, etc... because if you assume every damage you deal
goes towards killing an enemy, your resulting dps will be wrong. This effect is
more pronounced when max hit is high and enemy hp is low, but it's still worth
accounting for in all but the most extreme cases as the effect is significant.
How I approached calculating this is to simply determine every possible combination
of hits that could lead to an enemy death and then figure out the probabilities
of each of those combinations happening. Since attack speed is constant, the
number of hits it takes to kill an enemy can be converted to time, so you actually
calculate the average time to kill an enemy and figure out dps by dividing the
enemies health by that time. Since the max hit can surpass 100 in oldschool runescape
and enemy hp can be over 1000 for some bosses, these calculations get enormous.
The amount of combinations to reach the enemy hp using any number from 1 to max hit
is equal to (max hit)^hp. So at the extreme case, (100)^1000. Javascript can't handle
integers this large normally, so the mathjs library enables us to calculate these
large numbers with a pretty good amount of precision, such that any errors will be
miniscule and neglible for comparison. */


// This function calculates the "count" of each combination of hits for each hp
// up to the hp of the enemy.
export const getFinalRatios = (maxHit, hp) => {
  let finalRatios = [];
  let i;
  let firstLine = [];
  for (i=0; i<hp; i++) {
    if (i < maxHit) {
      firstLine.push(1);
    } else {
      firstLine.push(0);
    }
  }
  finalRatios.push(firstLine);
  let j;
  let n = hp-1;
  for (j=0; j<n; j++) {
    let additionalLine = [];
    let k;
    let m = finalRatios[j].length;
    for (k=0; k<m; k++) {
      if (k<=j) {
        additionalLine.push(0);
      } else if (k<maxHit) {
        let sectionToSum = finalRatios[j].slice(0, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalLine.push(sum);
      } else {
        let sectionToSum = finalRatios[j].slice(k-maxHit, k);
        let sum = sectionToSum.reduce((a, b) => a + b, 0);
        additionalLine.push(sum);
      }
    }
    finalRatios.push(additionalLine);
  }
  return finalRatios;
}

// The above function is an array of arrays forming a table of sorts. Each "row"
// counts as a hit and each "column" is the ways to reach the column-count or hp
// with that number of hits. For the other calculations, it's easier if this
// table is flipped, such that rows are columns and vice versa.
export const flipFinalRatios = (finalRatios) => {
  let i;
  let n = finalRatios.length;
  let flippedArray = [];
  for (i=0; i<n; i++) {
    let newRow = [];
    let j;
    let m = finalRatios.length;
    for (j=0; j<m; j++) {
      newRow.push(finalRatios[j][i]);
    }
    flippedArray.push(newRow);
  }
  return flippedArray;
}

// This function calculates the odds of reaching a set number in any number of
// hits. We know the minimum hits would be hitting the max hit every time until
// the enemy is dead. The maximum hits would be hitting a 1 every time so maximum
// hits is equal to enemy hp. Hitting 0 and not hitting at all (different things
// in oldschool runescape) are accounted for later.
export const generateArrayOfOdds = (finalRatios, flippedRatios, maxHit) => {
  let targetRatios = flippedRatios.pop();
  let oddsArray = [];
  let counter = math.bignumber(0);
  let i;
  let n = targetRatios.length;
  for (i=0; i<n; i++) {
    let possibleOutcomes = math.pow(math.bignumber(maxHit), math.add(math.bignumber(i), math.bignumber(1)));
    let previousNumbers = finalRatios[i].splice(0, finalRatios.length-1);
    let previousSum = previousNumbers.reduce((a, b) => a + b, 0);
    let subOdd = math.subtract(math.bignumber(possibleOutcomes), math.bignumber(previousSum));
    let divOdd = math.divide(math.bignumber(subOdd), math.bignumber(possibleOutcomes));
    let newOdd = math.subtract(math.bignumber(divOdd), math.bignumber(counter));
    counter = math.add(math.bignumber(newOdd), math.bignumber(counter));
    oddsArray.push(newOdd);
  }
  return oddsArray;
}

// Using the odds of killing an enemy per number of hits from minimum to maximum
// hits, this function determined the average damage per hit for any max hit and
// enemy hp fed to it. It also adjusts for the possibilty of hitting 0 on any hit
// since in runescape, even if you successfully land a hit, your damage is rolled
// between 0 and your max hit, not 1 and your max hit.
export const calculateAverageDamagePerHit = (oddsArray, maxHit, hp) => {
  let sumproduct = math.bignumber(0);
  let i;
  let n = oddsArray.length;
  for (i=0; i<n; i++) {
    let addSum = math.add(math.bignumber(i), math.bignumber(1))
    let newSum = math.multiply(math.bignumber(addSum), oddsArray[i]);
    sumproduct = math.add(math.bignumber(newSum), math.bignumber(sumproduct));
  }
  let adjustForZero = math.eval((hp/sumproduct) * (1-(1/(1+maxHit))));
  return math.number(adjustForZero);
}
