'use strict';

// *** CODE PLAN *** 
// My code plan is in the comments below as I feel I've been lacking in using quality comments on previous assignments, so I wanted to get practice doing that here.

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
    // * Each number represents the largest to smallest tokens: * 4 is the largest, * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// allows user input with startStack and endStack
const movePiece = (startStack, endStack) => {

  // Did the user enter a valid value? If it is legal move the piece can be moved
  if(isLegal(startStack, endStack)){
    // use pop() on the startStack to move last piece to the endStack with push()
    let popped = stacks[startStack].pop();
    stacks[endStack].push(popped);
  } 
  // if the above conditions aren't met don't allow the move to process and ask user to try again
  else {
    console.log("Invalid move. Please reconsider your move and try again.");
  }
}

// check if the current move isLegal
const isLegal = (startStack, endStack) => {
  // piece from the start stack
  let initialEntry = stacks[startStack][stacks[startStack].length - 1];
  // Get thepiece from the end stack
  let endingEntry = stacks[endStack][stacks[endStack].length - 1];
  
  // Conpare the two pieces and return false is start is larger than end, true otherwise
  if (initialEntry > endingEntry) {
    return false;
  } else {
    return true;
  };
};

// When any stack other than A has 4 pieces, as long as those pieces have all been isLegal moves
const checkForWin = () => {
 // user for ... of loop to iterate over the stacks
 for (let stack in stacks) { 
  // if the length of any stack is equal to 4 and it is in a stack other than Stack a the user has won
  if (stacks[stack].length === 4 && stack !== "a") {
  // acknowledge win 
    console.log("You have conquered Towers of Hanoi!!");
  }
}
}

// This is how the game actually function. Call movePiece and checkForWin()
const towersOfHanoi = (startStack, endStack) => {
    movePiece(startStack, endStack);
    checkForWin()
  };

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { 
        a: [], 
        b: [4, 3, 2, 1],
        c: [] 
      };
      let actual = checkForWin(); 
      let expected = true;
      assert.equal(actual, expected)
    });
  });

} else {

  getPrompt();
}