//Our default Capacity
class Stack {
    #capacity;
    #size;
    constructor(initialCapacity = 24) {
        this.#capacity = initialCapacity;
        this.#size = 0;
        this.top = 0;
        this.data = new Array(initialCapacity);
    }

    isEmpty() {
        if(!this.#size){
            return true;
        }else{
            return false;
        }
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        if(this.#size === this.#capacity){
            throw new Error("Stack maximum size exceeded");
        }
        this.data[this.top++] = elem;
        this.#size++;
    }

    pop() {
        if(this.#size === 0){
            throw new Error("No elements to pop");
        }
        let element = this.data[this.#size-1];
        this.#size--;
        this.top--;
        return element;
    }

    clear() {
        this.#size = 0;
        this.top;
    }

    [Symbol.iterator]() {
        return {
            top: 0,
            size: this.#size,
            data: this.data,
            next(){
                if(this.top < this.size){
                    return {
                        value: this.data[this.top++],
                        done:false,
                    }
                }else{
                    return {
                        value:undefined,
                        done: true
                    }
                }
            }
        }
    }
}


const stack = new Stack(3);

// Test 1: isEmpty()
console.log(stack.isEmpty()); // true

// Test 2: push()
stack.push(10);
stack.push(20);
console.log(stack.size);      // 2
console.log(stack.isEmpty()); // false

// Test 3: pop()
stack.pop();
console.log(stack.size); // 1

// Test 4: push() up to capacity
stack.push(30);
stack.push(40);
console.log(stack.size); // 3

// Test 5: push() beyond capacity
try {
    stack.push(50);
} catch (error) {
    console.log(error.message);
    // Stack maximum size exceeded
}

// Test 6: clear()
stack.clear();
console.log(stack.size);      // 0
console.log(stack.isEmpty()); // true

// Test 7: pop() on an empty stack
try {
    stack.pop();
} catch (error) {
    console.log(error.message);
    // No elements to pop
}

// Test 8: Symbol.iterator
stack.push(1);
stack.push(2);
stack.push(3);

for (const elem of stack) {
    console.log(elem);
}

// Expected output:
// 1
// 2
// 3




