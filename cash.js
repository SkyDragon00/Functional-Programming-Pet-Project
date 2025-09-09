function checkCashRegister(price, cash, cid) {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let changeDue = cash - price;

  // Total cash in drawer
  let totalCID = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);

  // Case 1: not enough funds
  if (Number(totalCID) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Case 2: exact funds = closed
  if (Number(totalCID) === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // Case 3: try to return change
  let changeArr = [];
  let reversedCID = cid.reverse();

  for (let [unit, amount] of reversedCID) {
    let value = currencyUnit[unit];
    let toReturn = 0;

    while (changeDue >= value && amount > 0) {
      changeDue = (changeDue - value).toFixed(2);
      amount -= value;
      toReturn += value;
    }

    if (toReturn > 0) {
      changeArr.push([unit, toReturn]);
    }
  }

  // If still some change left → insufficient funds
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArr };
}
