class Queue {
    #capacity;  
    #size;
    #front;
    #rear;
    
    constructor(capacity = 8) {
        this.#capacity = capacity;
        this.#size = 0;
        this.#front = 0;
        this.#rear = 0; 
        this.data = new Array(this.#capacity);
    }

    enqueue(elem) {
        if(this.#size === this.#capacity){
            throw new Error("Queue maximum size exceeded");
        }
        this.data[this.#rear] = elem;
        this.#rear = (this.#rear + 1)%this.#capacity;
        this.#size++;
    }

    dequeue() {
        if(this.#size === 0){
            throw new Error("No elements to dequeue");
        }
        this.#front = (this.#front+1)%this.#capacity;
        this.#size--;
    }

    get size() {
        return this.#size;
    }

    get_front() {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        return this.data[this.#front];
    }

    get_back() {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        return this.data[(this.#rear - 1 + this.#capacity) % this.#capacity];
    }

    print() {
        if(this.#size === 0){
            return [];
        }
        let printArr = [];
        for (let i = 0; i < this.#size; i++) {
            printArr.push(this.data[(this.#front + i) % this.#capacity]);
        }
        return printArr;
    }

    isEmpty() {
        if(this.#size === 0){
            return true;
        }
        return false;
    }

    [Symbol.iterator]() {
        return {
            current: 0,
            size: this.#size,
            front: this.#front,
            capacity: this.#capacity,
            data: this.data,
            next(){
                if(this.current < this.size){
                    return {
                        value: this.data[(this.front + this.current++) % this.capacity],
                        done: false,
                    }
                }else{
                    return {
                        value:undefined,
                        done: true,
                    }
                }
            }
        }
    }
}

const queue = new Queue(3);

// Test 1: isEmpty()
console.log(queue.isEmpty()); // true

// Test 2: enqueue()
queue.enqueue(10);
queue.enqueue(20);

console.log(queue.size); // 2
console.log(queue.isEmpty()); // false

// Test 3: get_front()
console.log(queue.get_front()); // 10

// Test 4: get_back()
console.log(queue.get_back()); // 20

// Test 5: dequeue()
queue.dequeue();

console.log(queue.size); // 1
console.log(queue.get_front()); // 20

// Test 6: enqueue() until capacity
queue.enqueue(30);
queue.enqueue(40);

console.log(queue.size); // 3

// Test 7: enqueue() beyond capacity
try {
    queue.enqueue(50);
} catch (error) {
    console.log(error.message);
    // Expected: capacity exceeded error
}

// Test 8: print()
console.log(queue.print());
// Expected: 20 30 40
// (depending on your print() implementation)

// Test 9: Symbol.iterator
for (const elem of queue) {
    console.log(elem);
}
// Expected:
// 20
// 30
// 40

// Test 10: dequeue() until empty
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log(queue.size); // 0
console.log(queue.isEmpty()); // true

// Test 11: dequeue() from empty queue
try {
    queue.dequeue();
} catch (error) {
    console.log(error.message);
    // Expected: empty queue error
}

// Test 12: get_front() on empty queue
try {
    queue.get_front();
} catch (error) {
    console.log(error.message);
    // Expected: empty queue error
}

// Test 13: get_back() on empty queue
try {
    queue.get_back();
} catch (error) {
    console.log(error.message);
    // Expected: empty queue error
}
