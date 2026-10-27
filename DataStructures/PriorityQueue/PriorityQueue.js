class PriorityQueue {
    constructor(compareFn) {
        this.heap = [];
        this.compareFn = compareFn || ((a, b) => a - b);
    }

    swap(i, j) {
        [this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]];
    }

    heapifyUp() {
        let idx = this.heap.length-1;
        while(idx > 0 && this.compareFn(this.heap[idx], this.heap[this.getParent(idx)]) < 0){
            [this.heap[idx],this.heap[this.getParent(idx)]] = [this.heap[this.getParent(idx)], this.heap[idx]];
            idx = this.getParent(idx);
        }
    }

    heapifyDown(index = 0) {
        let smallest = index;
        while(true){
            let left = this.getLeftChild(index);
            let right = this.getRightChild(index);
            if(this.compareFn(this.heap[left],this.heap[smallest]) < 0){
                smallest = left;
            }
            if(this.compareFn(this.heap[right],this.heap[smallest]) < 0){
                smallest = right;
            }
            if(smallest === index){
                break;
            }
            this.swap(index,smallest);
            index = smallest;
        }
    }
    //returns the parent's index
    getParent(i) {
        return Math.abs((i-1)/2);
    }

    //returns the left child's index
    getLeftChild(i) {
        return (i*2)+1;

    }

    //returns the right child's index
    getRightChild(i) {
        return (i*2)+2;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        if(this.heap.length === 0){
            return  true;
        }
        return false;
    }

    peek() {
        if(!this.isEmpty()){
            return this.heap[0];
        }
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if(this.isEmpty()) return "The Queue is Empty";
        let val = this.heap[0];
        let last = this.heap.pop();
        if(!this.isEmpty()){
            this.heap[0] = last;
            this.heapifyDown();
        }
        return val;
    }
}

console.log("===== MIN PRIORITY QUEUE =====");
const minPQ = new PriorityQueue((a, b) => a - b);

minPQ.push(40);
minPQ.push(10);
minPQ.push(30);
minPQ.push(5);
minPQ.push(20);

console.log("Size:", minPQ.size());       // 5
console.log("Peek:", minPQ.peek());       // 5
console.log("Pop:", minPQ.pop());         // 5
console.log("Peek after pop:", minPQ.peek()); // 10

console.log("Pop:", minPQ.pop());         // 10
console.log("Pop:", minPQ.pop());         // 20
console.log("Pop:", minPQ.pop());         // 30
console.log("Pop:", minPQ.pop());         // 40

console.log("Is empty:", minPQ.isEmpty()); // true
console.log("Size:", minPQ.size());       // 0

console.log("===== MAX PRIORITY QUEUE =====");

const maxPQ = new PriorityQueue((a, b) => b - a);

maxPQ.push(40);
maxPQ.push(10);
maxPQ.push(30);
maxPQ.push(5);
maxPQ.push(20);

console.log("Size:", maxPQ.size());       // 5
console.log("Peek:", maxPQ.peek());       // 40
console.log("Pop:", maxPQ.pop());         // 40
console.log("Peek after pop:", maxPQ.peek()); // 30

console.log("Pop:", maxPQ.pop());         // 30
console.log("Pop:", maxPQ.pop());         // 20
console.log("Pop:", maxPQ.pop());         // 10
console.log("Pop:", maxPQ.pop());         // 5

console.log("Is empty:", maxPQ.isEmpty()); // true
console.log("Size:", maxPQ.size());       // 0

