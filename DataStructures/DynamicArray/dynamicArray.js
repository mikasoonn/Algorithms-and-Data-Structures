class DynamicArray {
   #arr;
   #size;
   #capacity;
   #GROWTH = 2;

   constructor(cap) {
       if (cap <= 0 || !Number.isInteger(cap)) {
           throw new TypeError("Expected an integer number");
       }

       this.#arr = new Uint32Array(cap);
       this.#capacity = cap;
       this.#size = 0;
   }

   #resize() {
       const newCap = this.#capacity * this.#GROWTH;
       const tmp = new Uint32Array(newCap);

       for (let i = 0; i < this.#size; ++i) {
           tmp[i] = this.#arr[i];
       }

       this.#capacity = newCap;
       this.#arr = tmp;
   }

   push_back(elem) {
       if (this.#size === this.#capacity) {
           this.#resize();
       }

       if (!Number.isInteger(elem)) {
           throw new TypeError("Expected an integer number");
       }

       this.#arr[this.#size++] = elem;
   }

   pop_back() {
       if (!this.#size) {
           throw new RangeError("Cannot delete from an empty array");
       }

       return this.#arr[--this.#size];
   }

   at(index) {
       if (!Number.isInteger(index)) {
            throw new TypeError("Expected an integer number");
       }
       if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
       }

       return this.#arr[index];
   }

   set(index, value) {
        if (!Number.isInteger(index)) {
            throw new TypeError("Expected an integer number");
        }
        if(index < 0 || index >= this.#size){
            throw new RangeError("Index is out of range");
        }
        if (!Number.isInteger(value)) {
            throw new TypeError("Expected an integer number");
        }
        if(index < 0 || index >= this.#size){
            throw new RangeError("Value is out of range");
        }
       

        this.#arr[index] = value;

        return value;
    }

   front() {
        if(!this.#size){
            return RangeError("Cannot get the first element from an empty array");
        }
        return this.#arr[0];
   }

   back() {
        if(!this.#size){
            return RangeError("Cannot get the last element from an empty array");
        }
        return this.#arr[this.#size - 1];
   }

   erase(pos) {
        if(!Number.isInteger(pos)){
            throw new TypeError("Expected an integer number");
        }
        if(pos < 0 || pos >= this.#size){
            throw new RangeError("Position is out of range");
        }
        const ret = this.#arr[pos];
        for(let i = pos; i < this.#size - 1; i++){
            this.#arr[i] = this.#arr[i+1];
        }
        this.#size--;
        return ret;
   }

   insert(pos, value) {
        if(!Number.isInteger(pos)){
            throw new TypeError("Expected an integer number");
        }
        if(pos < 0 || pos >= this.#size){
            throw new RangeError("Position is out of range");
        }
        if (!Number.isInteger(value)) {
            throw new TypeError("Expected an integer number");
        }
        if(index < 0 || index >= this.#size){
            throw new RangeError("Value is out of range");
        }

       if (this.#size === this.#capacity) {
           this.#resize();
       }

       for (let i = this.#size; i > pos; --i) {
           this.#arr[i] = this.#arr[i - 1];
       }

       this.#arr[pos] = value;
       this.#size++;

       return pos;
   }

   swap(i, j) {
        if(i < 0 || i >= this.#size){
            throw new RangeError("(i) is out of range");
        } 
        if(j < 0 || j >= this.#size){
            throw new RangeError("(j) is out of range");
        }
        //Cpp swipe
        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
   }

   *values() {
        if(this.#size <= 0){
            //Returns an Empty Dynamic Array with one capacity
            return new DynamicArray(1);
        }
        for(let i = 0; i < this.#size; i++){
            yield this.#arr[i];
        }
   }

   *keys() {
        if(this.#size <= 0){
            //Returns an Empty Dynamic Array with one capacity
            return new DynamicArray(1);
        }
        for(let i = 0; i < this.#size; i++){
            yield i;
        }
   }

   forEach(fn) {
        if(this.#size <= 0){
            //Returns an Empty Dynamic Array with one capacity
            return new DynamicArray(1);
        }
        if(typeof(fn) !== "function"){
            return new TypeError("Expected a function");
        }
        for(let i = 0; i < this.#size; i++){
            if(i in this.#arr){
                fn(this.#arr[i],i,this.#arr);

            }
        }
        return undefined;
   }

   map(fn) {
        if(this.#size <= 0){
            //Returns an Empty Dynamic Array with one capacity
            return new DynamicArray(1);
        }
        if(typeof(fn) !== "function"){
            return new TypeError("Expected a function");
        }
        let retArr = new DynamicArray(this.#size);
        for(let i = 0; i < this.#size; i++){
            if(i in this.#arr){
            retArr.push_back(fn(this.#arr[i],i,this.#arr));
        }}
        return retArr;
   }

   filter(fn) {
        if(this.#size <= 0){
            //Returns an Empty Dynamic Array with one capacity
            return new DynamicArray(1);
        }
        if(typeof(fn) !== "function"){
            return new TypeError("Expected a function");
        }

        //Size is the worst case
        let retArr = new DynamicArray(this.#size);
        for(let i = 0; i < this.#size; i++){
            if(i in this.#arr){
            let flag = fn(this.#arr[i],i,this.#arr);
            if(flag){
                retArr.push_back(flag);
            }
        }}
        return retArr;
   }

   reduce(fn, init) {
    if(this.#size <= 0 && init === undefined){
        throw new TypeError("Cannot call reduce on an empty array");
    }else if(this.#size <= 0 && init){
        return init;
    }
    let acc;
    if(init === undefined){
        acc = this.#arr[0];    
        for(let i = 1; i < this.#size; i++){
            acc = fn(acc,this.#arr[i],i,this.#arr);
        }
    }else{
        acc = init;
        for(let i = 0; i < this.#size; i++){
            acc = fn(acc,this.#arr[i],i,this.#arr);
        }
    }
    return acc;

   }

   some(fn) {
    if(this.#size <= 0){
        return false;

    }
    for(let i = 0; i < this.#size; i++){
        if(fn(this.#arr[i],i,this.#arr)){
            return true;
        }
    }
    return false;
   }

   find(fn) {
    if(this.#size <= 0){
        return undefined;
    }
    for(let i = 0; i < this.#size; i++){
        if(fn(this.#arr[i],i,this)){
            return this.#arr[i];
        }
    }
    return undefined;
   }

   findIndex(fn) {
    if(this.#size <= 0){
        return undefined;
    }
    for(let i = 0; i < this.#size; i++){
        if(fn(this.#arr[i],i,this)){
            return i;
        }
    }
    return undefined;
   }

   includes(value) {
    if(this.#size <= 0){
        return false;
    }
    for(let i = 0; i < this.#size; i++){
        if(value === this.#arr[i]){
            return true;
        }
    }
    return false;
   }


   [Symbol.iterator]() {
    return {
        start: 0,
        end: this.#size,
        arr: this.#arr,
        next(){
            if(this.start < this.end){
                return{
                    value: this.arr[this.start++],
                    done: false,
                }
            }   
            return {
                value: undefined,
                done: true,
            }
        }
    }
   }
}

const arr = new DynamicArray(5);

// arr.push_back(10);
// arr.push_back(15);
// arr.push_back(20);
// arr.push_back(30);
// arr.push_back(40);
// arr.push_back(50);
// console.log(arr.front());
// console.log(arr.back());
// console.log(arr.erase(1));
// console.log(arr.at(1));

let func = arr.values();
console.log(func.next().value);


