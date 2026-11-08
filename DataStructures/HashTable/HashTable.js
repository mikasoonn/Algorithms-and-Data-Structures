function isPrime(n){
    if(n == 1 || n < 1)return false;
    if(n == 2)return true;
    for(let i = 2; i <= Math.sqrt(n); i++){
        if(n % i == 0) return false;
    }
    return  true;
}

function nextPrime(n){
    n++;
    while(true){
        if(isPrime(n))return n;
        n++;
    }
}

class HashTable {
    constructor(initialCapacity = 11, maxLoadFactor = 1.0){
        this.Capacity = initialCapacity;
        this.maxLoadFactor = maxLoadFactor;
        this.table = new Array(initialCapacity).fill(0).map(() => []);
        this.sizeCount = 0;
        this.resizing = false;
    }

    _hash(key){
        if(typeof(key) === "string"){
            const H = 37;
            var total = 0;
            for (var i = 0; i < key.length; ++i) {
                total = H * total + key.charCodeAt(i);
            }
            total = total % this.table.length;
            if (total < 0) {
                total += this.table.length-1;
            }
            return parseInt(total);
        }else if(typeof(key) === "number"){
            return parseInt(((key % this.Capacity) + this.Capacity) % this.Capacity);
        }
        
    }

    loadFactor(){
        return this.sizeCount/this.table.length;
    }

    has(key){
        let pos = this._hash(key);
        for(let i = 0; i < this.table[pos].length;i++){
            if(this.table[pos][i][0] === key)return true;
        }
        return false;
    }

    get(key){
        let pos = this._hash(key);
        for(let i = 0; i < this.table[pos].length; i++){
            if(this.table[pos][i][0] === key) return this.table[pos][i][1];
        }
        return undefined;
    }

    set(key, value){
        let pos = this._hash(key);
        let flag = 0;
        for(let i = 0; i < this.table[pos].length; i++){
            const [myKey,myValue] = this.table[pos][i];
            if(myKey === key){ 
                this.table[pos][i][1] = value;
                flag++;
                break;
            } 
        }
        if(!flag){
            this.table[pos].push([key,value]);
            this.sizeCount++;
        }
        if(!this.resizing && this.loadFactor() > this.maxLoadFactor){
            this.resize();
        }
        
    }

    getSize(){
        return this.sizeCount;
    }

    delete(key){
        let pos = this._hash(key);
        for(let i = 0; i < this.table[pos].length; i++){
            if(this.table[pos][i][0] === key){
                for(let j = i; j < this.table[pos].length-1;j++){
                    this.table[pos][j] = this.table[pos][j+1];
                }
                this.table[pos].pop();
                this.sizeCount--;
                return;
            }
        }
    }

    *keys(){
        for(let i = 0; i < this.table.length; i++){
            for(let j = 0; j < this.table[i].length;j++){
                yield this.table[i][j][0];
            }
        }
    }

    *values(){
        for(let i = 0; i < this.table.length; i++){
            for(let j = 0; j < this.table[i].length;j++){
                yield this.table[i][j][1];
            }
        }
    }

    *entries(){
        for(let i = 0; i < this.table.length; i++){
            for(let j = 0; j < this.table[i].length;j++){
                yield this.table[i][j];
            }
        }
    }

    resize(){
        this.resizing = true;
        this.Capacity = nextPrime(this.Capacity*2);
        this.sizeCount = 0;
        let copyTable = this.table;
        this.table = new Array(this.Capacity).fill(0).map(()=>[]);
        for(let i = 0; i < copyTable.length; i++){
            for(let j = 0; j < copyTable[i].length; j++){
                this.set(copyTable[i][j][0],copyTable[i][j][1]);
            }
        }
        this.resizing = false;
    }

    clear(){
        for(let i = 0; i < this.table.length;i++){
            this.table[i] = [];
        }
        this.sizeCount = 0;
    }

    *[Symbol.iterator](){
        for(let i = 0; i < this.table.length; i++){
            for(let j = 0; j < this.table[i].length; j++){
                yield this.table[i][j];
            }
        }
    }
}

const ht = new HashTable(5);

ht.set("name", "Sophie");
ht.set(10, "James");
ht.set("age", 20);

// Set
console.log("Set:", ht.set("city", "New York"));

// Get
console.log("Get string:", ht.get("name"));
console.log("Get number:", ht.get(10));
console.log("Get age:", ht.get("age"));
console.log("Get missing:", ht.get("unknown"));

// Has
console.log("Has name:", ht.has("name"));
console.log("Has number:", ht.has(10));
console.log("Has missing:", ht.has("unknown"));

// Delete
console.log("Delete name:", ht.delete("name"));
console.log("Delete number:", ht.delete(10));
console.log("Delete missing:", ht.delete("unknown"));
console.log("Size after delete:", ht.getSize());

// Keys
console.log("Keys:", [...ht.keys()]);

// Values
console.log("Values:", [...ht.values()]);

// Entries
console.log("Entries:", [...ht.entries()]);

// Symbol.iterator
console.log("Iterator:", [...ht]);

// Clear
ht.clear();
console.log("Size after clear:", ht.getSize());
console.log("Load factor after clear:", ht.loadFactor());
console.log("Keys after clear:", [...ht.keys()]);
console.log("Table after clear:", ht.table);