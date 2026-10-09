class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DList {
    #size = 0;
    constructor(iterables) {
        if( typeof(iterables[Symbol.iterator]) === "function"){
            let i = 0;
            while(i < iterables.length){
                this.push_back(iterables[i]);
                i++;
            }
        }else{
        this.tail = this.head = new Node(iterables);
        this.#size++;
        }
    }

    static fromArray(arr) {}

    get size() {
        return this.#size;
    }

    clear() {
        this.head = null;
        this.tail = null;
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
        let newNode = new Node(elem);
        current.next = newNode;
        current.next.prev = current;
        this.tail = newNode;
        this.#size++;
    }

    push_front(elem) {
        if(!this.head){
            this.head = new Node(elem);
            return;
        }
        let newNode = new Node(elem);
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.#size++;
    }

    pop_back() {
        if(!this.head){
            throw new Error("No elements to pop");
        }
        let current = this.head;
        while(current.next.next){
            current = current.next;
        }
        this.tail = current;
        current.next = null;
        this.#size--;
    }

    pop_front() {
        if(!this.head){
            throw new Error("No elements to pop");
        }
        this.head.next.prev = null;
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
        return this.head.data;
    }

    back() {
        return this.tail.data;
    }

    isEmpty() {
        if(!this.head){
            return true;
        }
        return false;
    }

    at(index) {
        if(!this.head){
            throw new Error("No elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected integer");
        }
        //indexing starts at 0
        if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
        }
        if(index < this.#size/2){
            let current = this.head;
            while(current && index){
                current = current.next;
                index--;
            }
            return current.data;
        }else{
            let current = this.tail;
            index = this.#size-index-1;
            while(current && index){
                current = current.prev;
                index--;
            }
            return current.data;
        }
    }

    insert(index, value) {
        if(!this.head){
            throw new Error("No elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected integer");
        }
        //indexing starts at 0
        if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
        }
        if(index === this.#size-1){
            this.push_back(value);
            return;
        }else if(index === 0){
            this.push_front(value);
            return;
        }
        let newNode = new Node(value);
        if(index < this.#size/2){
            let current = this.head;
            while(current && index > 1){
                current = current.next;
                index--;
            }
            newNode.next = current.next;
            newNode.prev = current;
            current.next.prev = newNode;
            current.next = newNode;
            this.#size++;
        }else{
            console.log("fromEnd");
            let current = this.tail;
            index = this.#size-index+1;
            while(current && index > 1){
                current = current.prev;
                index--;
            }
            newNode.next = current.next;
            newNode.prev = current;
            current.next.prev = newNode;
            current.next = newNode;
            this.#size++;
        }

    }

    erase(index) {
        if(!this.head){
            throw new Error("No elements");
        }
        if(!Number.isInteger(index)){
            throw new TypeError("Expected integer");
        }
        //indexing starts at 0
        if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
        }
        if(index === this.#size-1){
            this.pop_back();
            return;
        }else if(index === 0){
            this.pop_front();
            return;
        }
        if(index < this.#size/2){
            let current = this.head;
            while(index && current){
                index--;
                current = current.next;
            }
            current.next.prev = current.prev;
            current.prev.next = current.next;
            this.#size--;
        }else{
            let current = this.head;
            while(index && current){
                index--;
                current = current.next;
            }
            current.next.prev = current.prev;
            current.prev.next = current.next;
            this.#size--;
        }
    }

    remove(value) {
        if(!this.head){
            throw new Error("Empty List");
        }
        let current = this.head;
        while(current.next && current.next.data !== value){
            current = current.next;
        }
        if(current.next){
            if(!current.next.next){
                current.next = null;
                this.tail = current;
            }else{
                current.next.next.prev = current;
                current.next = current.next.next;
            }
        }else{
            console.log("Value not found");
        }
    }

    reverse() {
        if(!this.head){
            throw new Error("Empty List");
        }
        let prev = null;
        let current = this.head;
        let next = null;
        this.tail = this.head;
        while(current.next){
            next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        current.next = prev;
        current.prev = null;
        this.head = current;
        
    }

    merge(list1, list2,cmp) {
        const dummy = new Node();
        let current = dummy;

        while(list1 && list2){
            if(cmp(list1.data, list2.data) <= 0){
                current.next = list1;
                list1.prev = current;
                list1 = list1.next;
            }else{
                current.next = list2;
                list2.prev = current;
                list2 = list2.next;
            }
            current = current.next;
        }
        current.next = list1 || list2;
        
        dummy.next.prev = null;
        return dummy.next;
    }


    sort(cmp) {
        
        cmp = typeof(cmp) === "function"?cmp:(a,b) => a-b;
        
        let mergeSort = (list) => {
            if(!list || !list.next){
            return list;
            }
            let slow = list;
            let fast = list.next;
            while(fast && fast.next){
                fast = fast.next.next;
                slow = slow.next;
            }
            let mid = slow.next;
            slow.next = null;
            mid.prev = null;
            let left = mergeSort(list);
            let right = mergeSort(mid);
            return this.merge(left,right,cmp);
        }
        this.head = mergeSort(this.head);
    }

    [Symbol.iterator]() {
        return {
            current:this.head,
            data: current.data,
            next(){
                if(current){
                    return {
                        data:this.data,
                        done: false,
                    }
                }
                return {
                    data: undefined,
                    done: false,
                }
            }
        }
    }
}


let obj = new DList(5);
console.log(obj.size);
obj.push_back(45);
obj.push_back(12);
obj.push_back(28);
obj.push_back(32);
console.log(obj.size);
console.log(obj.toArray());
console.log(obj.at(0));
obj.insert(4,8);
console.log(obj.toArray());
obj.erase(5);
console.log(obj.toArray());
obj.remove(100);
console.log(obj.toArray());
// obj.reverse();
// console.log(obj.toArray());
obj.sort();
console.log(obj.toArray());
console.log("this");





