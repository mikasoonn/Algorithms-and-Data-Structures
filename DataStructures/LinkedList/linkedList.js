class Node {

    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class SList {
    #size = 0;
    constructor(iterables) {
        if( typeof(iterables[Symbol.iterator]) === "function"){
            let i = 0;
            while(i < iterables.length){
                this.push_back(iterables[i]);
                i++;
            }
        }else{
        this.head = new Node(iterables);
        this.#size++;
        }
    }


    get size() {
        return this.#size;
    }

    clear() {
        this.head = null;
    }

    push_back(elem) {
        if(!this.head){
            this.head = new Node(elem);
            return;
        }
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = new Node(elem);
        this.#size++;

    }

    push_front(elem) {
        let newNode = new Node(elem);
        newNode.next = this.head;
        this.head = newNode;
        this.#size++;
    }

    pop_back() {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        let current = this.head;
        while(current.next.next){
            current = current.next;
        }
        current.next = null;
        this.#size--;
    }

    pop_front() {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        this.head = this.head.next;
        this.#size--;
    }

    toArray() {
        let arr = [];
        let current = this.head;
        while(current){
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }

    front() {
        if(!this.head){
            throw new Error("No Elements");
        }
        return this.head.data;
    }

    isEmpty() {
        if(this.#size === 0){
            return true;
        }
        return false;
    }

    at(index) {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected integer");
        }
        //indexing starts from 0
        if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
        }
        let current = this.head;
        while(current && index){
            index--;
            current = current.next;
        }
        return current.data;
    }

    insert(index, value) {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected Integer");
        }
        if( index < 0 || index >= this.#size ){
           throw new RangeError("Index is out of range"); 
        }
        if(index === 0){
            this.push_front(value);
            return;
        }
        let current = this.head;
        while(current && index > 1){
            index--;
            current = current.next;
        }
        let newNode = new Node(value);
        newNode.next = current.next;
        current.next  = newNode;
        this.#size++;
    }

    erase(index) {
        if(this.#size === 0){
            throw new Error("No Elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected Integer");
        }
        if( index < 0 || index >= this.#size ){
           throw new RangeError("Index is out of range"); 
        }
        if(index === 0){
            this.pop_front(value);
            return;
        }
        let current = this.head;
        while(current && index > 1){
            index--;
            current = current.next;
        }
        
        current.next  = current.next.next;
        this.#size--;
    }

    reverse() {
        if(!this.head){
            throw new Error("Cannot reverse, the list is empty");
        }
        if(this.#size === 1){
            return this.head;
        }

        let prev = null;
        let next = null;
        let current = this.head;
        while(current.next){
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        current.next = prev;
        this.head = current;
    }

    merge(l1, l2, cmpFn) {
        //The head of our new merged list
        const dummy = new Node();
        let current = dummy;
        while(l1 && l2){
            if(cmpFn(l1.data, l2.data) <= 0){
                current.next = l1;
                l1 = l1.next;

            }else{
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        current.next = l1 || l2;
        return dummy.next;
    }

    remove(value) {
        if(!this.head){
            throw new Error("No elements");
        }
        let current = this.head;
        while( current.next && current.next.data !== value){
            current = current.next;
        }
        if(current.next){
            current.next = current.next.next;
            this.#size--;
        }else{
            return "Value not found";
        }
    }

    sort(cmp) {
        cmp = typeof(cmp) === "function"?cmp:(a,b) => a - b;
        const mergeSort = (list) =>{
            if(!list || !list.next) return list;
            let slow = list;
            let fast = list.next;
            while(fast && fast.next){
                fast = fast.next.next;
                slow = slow.next;
            }
            let mid = slow.next;
            slow.next = null;
            let left = mergeSort(list);
            let right = mergeSort(mid);
            return this.merge(left,right,cmp);
        }
        this.head = mergeSort(this.head);
    }


    [Symbol.iterator]() {
        return {
            current: this.head,
            data: current.data,
            next(){
                if(current){
                    return {
                        value: this.data,
                        done: false,
                    }
                }
                return {
                    value:undefined,
                    done: true,
                }
            }
        }
    }
}

let arr = [15,25,36];
let list = new SList(arr);
console.log(list.size);
list.push_back(7);
list.push_back(4);
list.push_back(10);
list.push_back(12);
console.log(list.size);
console.log(list.toArray());
// console.log(list.isEmpty());
// list.push_front(10);
// console.log(list.toArray());
// list.pop_front();
// list.pop_back();
// console.log(list.toArray());
// console.log(list.size);
// console.log(list.at(1));
// list.insert(1,18);
// console.log(list.toArray());
// console.log(list.size);
// // list.erase(1);
// // console.log(list.toArray());
// // list.remove(10);
// // console.log(list.toArray());

// list.reverse();
// console.log(list.toArray());

// list.sort();
// console.log(list.toArray());








