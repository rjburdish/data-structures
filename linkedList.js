const Mocha = require("mocha");
const mocha = new Mocha();
const assert = require("assert");

class Node {
  constructor(val) {
    this.value = val;
  }
}

class LinkedList {
  constructor(val) {
    this.head = new Node(val);
    this.tail = this.head;
  }
  addNode(val) {
    const node = new Node(val);
    this.tail.next = node;
    this.tail = node;
  }
  removeNode(val) {
    let curr = this.head;
    if (curr && curr.value === val) this.head = curr.next;
    while (curr && curr.next) {
      if (curr.next.value === val) {
        curr.next = curr.next.next;
        if (!curr.next) this.tail = curr;
      }
      curr = curr.next;
    }
  }
  findFromLast(k) {
    let curr = this.head;
    let runner = curr;
    for (let i = 0; i < k; i++) {
      if (!runner || !runner.next) return null; // out of bounds
      runner = runner.next;
    }
    while (runner && runner.next) {
      runner = runner.next;
      curr = curr.next;
    }
    return curr;
  }
  partitionIterative(val) {
    // Iterate through the list
    // Create a list of lower and a list of higher than or equal
    // concat the lists
    // O(N) Time // O(N) Space
    let leftHead = null;
    let leftTail = null;
    let rightHead = null;
    let rightTail = null;

    let curr = this.head;
    if (!curr) return console.log("No values in list");

    while (curr) {
      if (curr.value < val) {
        if (!leftHead) {
          leftHead = curr;
          leftTail = leftHead;
        } else {
          leftTail.next = curr;
          leftTail = curr;
        }
      } else {
        if (!rightHead) {
          rightHead = curr;
          rightTail = rightHead;
        } else {
          rightTail.next = curr;
          rightTail = curr;
        }
      }
      curr = curr.next;
    }

    if (leftTail && rightHead) leftTail.next = rightHead;

    this.head = leftHead || rightHead;
  }
}

function sumListsForward(nodeA, nodeB, sum = 0) {
  if (!nodeA && !nodeB) {
    if (sum > 0) return new Node(sum);
    return null;
  }

  if (nodeA) sum += nodeA.value;
  if (nodeB) sum += nodeB.value;

  let carryOver = Math.floor(sum / 10);
  const node = new Node(sum % 10);

  const nextA = nodeA ? nodeA.next : null;
  const nextB = nodeB ? nodeB.next : null;

  node.next = sumLists(nextA, nextB, carryOver);
  return node;
}
function sumListsBackward(nodeA, nodeB) {
  // console.log("A:", nodeA.value, "B:", nodeB.value);
  if (!nodeA && !nodeB) return new Node(0);

  let sum = 0;

  if (nodeA) sum += nodeA.value;
  if (nodeB) sum += nodeB.value;

  const nextA = nodeA ? nodeA.next : null;
  const nextB = nodeB ? nodeB.next : null;

  const node = sumListsBackward(nextA, nextB);

  node.value += sum;

  const carryOver = Math.floor(node.value / 10);
  node.value = node.value % 10;
  const carryNode = new Node(carryOver);
  carryNode.next = node;
  return carryNode;
}

function isPalindromPermutation(node) {
  // Create a map
  // Iterate LinkedList
  // Increment each key on map by 1 for each occurence
  // Ensure that there are 0 or 1 single occurences
  if (!node) return false;

  const map = new Map();
  while (node) {
    if (node.value) {
      const code = node.value.charCodeAt();
      map.set(code, map.get(code) + 1 || 1);
    }
    node = node.next;
  }
  let singleOccurence = 0;
  for (let [key, value] of map) {
    if (value % 2 > 0) singleOccurence++;
  }
  return singleOccurence < 2;
}
function isPalindrom(head) {
  if (!head) return false;

  let slow = head;
  let fast = head;
  const stack = new Array();

  while (fast && fast.next) {
    stack.push(slow.value);
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast) slow = slow.next; // This is required for lists of odd length

  while (slow) {
    if (stack.pop() !== slow.value) return false;
    slow = slow.next;
  }
  return true;
}
function doListsIntersect(nodeA, nodeB) {
  if (!nodeA || !nodeB) return false;
  const set = new Set();

  while (nodeA) {
    set.add(nodeA);
    nodeA = nodeA.next;
  }
  while (nodeB) {
    const exists = set.has(nodeB);
    if (exists) return true;
    nodeB = nodeB.next;
  }
  return false;
}

mocha.suite.emit("pre-require", this, "solution", mocha);

describe("isPalindromPermutation", () => {
  it("should be a palindrome permutation", () => {
    const list = new LinkedList("t");
    list.addNode("a");
    list.addNode("o");
    list.addNode("c");
    list.addNode("a");
    list.addNode("c");
    list.addNode("t");

    assert(isPalindromPermutation(list.head) === true);
  });
  it("should not be a palindrome permutation", () => {
    const list = new LinkedList("t");
    list.addNode("a");
    list.addNode("c");
    list.addNode("c");
    list.addNode("a");
    list.addNode("o");
    list.addNode("z");

    assert(isPalindromPermutation(list.head) === false);
  });
  it("empty should be a palindrom permutation", () => {
    const list = new LinkedList(null);

    assert(isPalindromPermutation(list.head) === true);
  });
  it("null should not be a palindrom permutation", () => {
    assert(isPalindromPermutation(null) === false);
  });
});

describe("isPalindrom", () => {
  it("should be a palindrome - ODD", () => {
    const list = new LinkedList("t");
    list.addNode("a");
    list.addNode("c");
    list.addNode("o");
    list.addNode("c");
    list.addNode("a");
    list.addNode("t");

    assert(isPalindrom(list.head) === true);
  });
  it("should be a palindrome - EVEN", () => {
    const list = new LinkedList("a");
    list.addNode("b");
    list.addNode("c");
    list.addNode("c");
    list.addNode("b");
    list.addNode("a");

    assert(isPalindrom(list.head) === true);
  });
  it("should not be a palindrome ", () => {
    const list = new LinkedList("t");
    list.addNode("a");
    list.addNode("c");
    list.addNode("c");
    list.addNode("a");
    list.addNode("o");
    list.addNode("z");

    assert(isPalindrom(list.head) === false);
  });
  it("should not be a palindrome - out of order", () => {
    const list = new LinkedList("t");
    list.addNode("a");
    list.addNode("o");
    list.addNode("c");
    list.addNode("c");
    list.addNode("a");
    list.addNode("t");

    assert(isPalindrom(list.head) === false);
  });
  it("empty should be a palindrom ", () => {
    const list = new LinkedList(null);

    assert(isPalindromPermutation(list.head) === true);
  });
  it("null should not be a palindrom ", () => {
    assert(isPalindrom(null) === false);
  });
});

describe("isIntersection", () => {
  it("should intersect", () => {
    const node1a = new Node("t");
    const node2a = new Node("y");
    node1a.next = node2a;
    const node3a = new Node("y");
    node2a.next = node3a;
    const node4a = new Node("y");
    node3a.next = node4a;
    const node5a = new Node("y");
    node4a.next = node5a;
    const node6a = new Node("y");
    node5a.next = node6a;

    const node1b = new Node("t");
    const node2b = new Node("y");
    node1b.next = node2b;
    const node3b = new Node("y");
    node2b.next = node3b;
    node3b.next = node4a;

    assert(doListsIntersect(node1a, node1b) === true);
  });
  it("should not intersect", () => {
    const node1a = new Node("t");
    const node2a = new Node("y");
    node1a.next = node2a;
    const node3a = new Node("y");
    node2a.next = node3a;
    const node4a = new Node("y");
    node3a.next = node4a;
    const node5a = new Node("y");
    node4a.next = node5a;
    const node6a = new Node("y");
    node5a.next = node6a;

    const node1b = new Node("t");
    const node2b = new Node("y");
    node1b.next = node2b;
    const node3b = new Node("y");
    node2b.next = node3b;

    assert(doListsIntersect(node1a, node1b) === false);
  });
  it("null should not intersect", () => {
    assert(doListsIntersect(null, null) === false);
  });
});

mocha.run();
