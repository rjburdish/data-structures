const Mocha = require("mocha");
const mocha = new Mocha();
const assert = require("assert");

class Stack {
  push(val) {
    const node = new Node(val);
    node.next = this.top;
    this.top = node;
  }
  pop() {
    if (!this.top) return null;
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
  peek() {
    if (!this.top) return null;
    return this.top.data;
  }
  isEmpty() {
    return !this.top;
  }
}

class StackWithMin extends Stack {
  constructor() {
    super();
    this.minStack = new Stack();
  }
  push(val) {
    super.push(val);
    if (!this.minStack.peek() || val <= this.minStack.peek())
      this.minStack.push(val);
  }
  pop() {
    if (this.minStack.peek() === this.peek()) this.minStack.pop();
    return super.pop();
  }
  min() {
    return this.minStack.peek();
  }
  peek() {
    if (!this.top) return null;
    return this.top.data;
  }
  isEmpty() {
    return !this.top;
  }
}

class Queue {
  add(val) {
    const node = new Node(val);
    if (!this.first) this.first = node;
    else this.last.next = node;
    this.last = node;
  }
  remove() {
    if (!this.first) return null;
    const node = this.first;
    this.first = node.next;
    return node.data;
  }
  peek() {
    if (!this.first) return null;
    return this.first.data;
  }
  isEmpty() {
    return !this.first;
  }
}
class Node {
  constructor(val) {
    this.data = val;
  }
}

/**
 * Stack
 **/
mocha.suite.emit("pre-require", this, "solution", mocha);
describe("stack", () => {
  it("should be null", () => {
    const stack = new Stack();
    assert(!stack.top);
  });
});
describe("push", () => {
  it("should be null", () => {
    const stack = new Stack();
    assert(!stack.top);
  });
  it("should be 7", () => {
    const stack = new Stack();
    stack.push(7);
    assert.equal(stack.top.data, 7);
  });
  it("should be 8", () => {
    const stack = new Stack();
    stack.push(7);
    stack.push(8);
    assert.equal(stack.top.data, 8);
  });
});
describe("pop", () => {
  it("should be null", () => {
    const stack = new Stack();
    assert(!stack.pop());
  });
  it("should be 7", () => {
    const stack = new Stack();
    stack.push(7);
    assert.equal(stack.pop(), 7);
  });
  it("First in Last out - should be 8", () => {
    const stack = new Stack();
    stack.push(7);
    stack.push(8);
    assert.equal(stack.pop(), 8);
  });

  it("First in Last out - should be 7", () => {
    const stack = new Stack();
    stack.push(7);
    stack.push(8);
    stack.pop();
    assert.equal(stack.pop(), 7);
  });
});
describe("peek", () => {
  it("should be null", () => {
    const stack = new Stack();
    assert(!stack.peek());
  });
  it("should be 7", () => {
    const stack = new Stack();
    stack.push(7);
    assert.equal(stack.peek(), 7);
  });
  it("First in Last out - should be 8", () => {
    const stack = new Stack();
    stack.push(7);
    stack.push(8);
    assert.equal(stack.peek(), 8);
  });

  it("First in Last out - should be 7", () => {
    const stack = new Stack();
    stack.push(7);
    stack.push(8);
    stack.pop();
    assert.equal(stack.peek(), 7);
  });
});
describe("isEmpty", () => {
  it("should be null", () => {
    const stack = new Stack();
    assert.equal(stack.isEmpty(), true);
  });
  it("should not be empty", () => {
    const stack = new Stack();
    stack.push(7);
    assert.equal(stack.isEmpty(), false);
  });
});

/**
 * Stack with min
 **/
mocha.suite.emit("pre-require", this, "solution", mocha);
describe("stack with min", () => {
  it("should be null", () => {
    const stack = new StackWithMin();
    console.log(stack);
    assert(!stack.min());
  });
});
describe("stack with min - push", () => {
  it("should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    assert.equal(stack.min(), 7);
  });
  it("should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.push(8);
    assert.equal(stack.min(), 7);
  });
  it("should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.push(8);
    stack.push(6);
    assert.equal(stack.min(), 6);
  });
});
describe("stack with min - pop", () => {
  it("should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.pop();
    assert(!stack.min());
  });
  it("First in Last out - should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.push(8);
    stack.push(6);
    stack.pop();
    assert.equal(stack.min(), 7);
  });
  it("First in Last out - should be 7", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.push(8);
    stack.push(6);
    stack.pop();
    stack.pop();
    assert.equal(stack.min(), 7);
  });
  it("First in Last out - should be null", () => {
    const stack = new StackWithMin();
    stack.push(7);
    stack.push(8);
    stack.push(6);
    stack.pop();
    stack.pop();
    stack.pop();
    assert(!stack.min());
  });
});

/**
 * Queue
 **/
mocha.suite.emit("pre-require", this, "solution", mocha);
describe("queue", () => {
  it("should be null", () => {
    const queue = new Queue();
    assert(!queue.first);
  });
});
describe("add", () => {
  it("should be null", () => {
    const queue = new Queue();
    assert(!queue.first);
  });
  it("should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    assert.equal(queue.first.data, 7);
  });

  it("should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    queue.add(8);
    assert.equal(queue.first.data, 7);
  });
});
describe("remove", () => {
  it("should be null", () => {
    const queue = new Queue();
    assert(!queue.remove());
  });
  it("should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    assert.equal(queue.remove(), 7);
  });
  it("First in first out - should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    queue.add(8);
    assert.equal(queue.remove(), 7);
  });

  it("First in first out - should be 8", () => {
    const queue = new Queue();
    queue.add(7);
    queue.add(8);
    queue.remove();
    assert.equal(queue.remove(), 8);
  });
});
describe("peek", () => {
  it("should be null", () => {
    const queue = new Queue();
    assert(!queue.peek());
  });
  it("should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    assert.equal(queue.peek(), 7);
  });
  it("First in first out - should be 7", () => {
    const queue = new Queue();
    queue.add(7);
    queue.add(8);
    assert.equal(queue.peek(), 7);
  });

  it("First in first out - should be 8", () => {
    const queue = new Queue();
    queue.add(7);
    queue.add(8);
    queue.remove();
    assert.equal(queue.peek(), 8);
  });
});
describe("isEmpty", () => {
  it("should be null", () => {
    const queue = new Queue();
    assert.equal(queue.isEmpty(), true);
  });
  it("should not be empty", () => {
    const queue = new Queue();
    queue.add(7);
    assert.equal(queue.isEmpty(), false);
  });
});

mocha.run();
