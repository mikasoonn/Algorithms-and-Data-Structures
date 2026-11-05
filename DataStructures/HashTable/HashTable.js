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


function test(name, condition) {
    if (condition) {
        console.log(`PASS: ${name}`);
    } else {
        console.error(`FAIL: ${name}`);
    }
}

function sameArray(actual, expected) {
    return JSON.stringify(actual) === JSON.stringify(expected);
}

// 1. isPrime() and nextPrime()

test("isPrime: 2 is prime", isPrime(2) === true);
test("isPrime: 7 is prime", isPrime(7) === true);
test("isPrime: 9 is not prime", isPrime(9) === false);
test("isPrime: 1 is not prime", isPrime(1) === false);
test("isPrime: 0 is not prime", isPrime(0) === false);

test("nextPrime: next prime after 5", nextPrime(5) === 7);
test("nextPrime: next prime after 11", nextPrime(11) === 13);

// 2. Constructor

const ht = new HashTable(5, 0.75);

test("Initial capacity", ht.Capacity === 5);
test("Initial size", ht.getSize() === 0);
test("Initial load factor", ht.loadFactor() === 0);

// 3. _hash()

const hashIndex = ht._hash("name");

test(
    "Hash index is within table boundaries",
    hashIndex >= 0 && hashIndex < ht.table.length
);

// 4. set()

ht.set("name", "Sona");
ht.set("age", 20);
ht.set("city", "Yerevan");

test("Set: inserts elements", ht.getSize() === 3);
test("Set: updates load factor", ht.loadFactor() === 3 / 5);

// 5. has()

test("Has: existing key", ht.has("name") === true);
test("Has: missing key", ht.has("country") === false);

// 6. get()

test("Get: existing key", ht.get("name") === "Sona");
test("Get: existing number value", ht.get("age") === 20);
test("Get: missing key", ht.get("unknown") === "not found");

// 7. set() updates existing key

ht.set("name", "Anna");

test("Set: updates existing value", ht.get("name") === "Anna");
test("Set: does not increase size on update", ht.getSize() === 3);

// 8. Collision test

const collisionTable = new HashTable(5);

const buckets = Array.from({ length: 5 }, () => []);

for (let i = 0; i < 100; i++) {
    const key = `key${i}`;
    const index = collisionTable._hash(key);
    buckets[index].push(key);
}

const collisionBucket = buckets.find(bucket => bucket.length >= 2);

if (collisionBucket) {
    const [key1, key2] = collisionBucket;

    collisionTable.set(key1, "first");
    collisionTable.set(key2, "second");

    test(
        "Collision: both keys are stored",
        collisionTable.get(key1) === "first" &&
        collisionTable.get(key2) === "second"
    );

    test(
        "Collision: both keys exist",
        collisionTable.has(key1) && collisionTable.has(key2)
    );
}

// 9. delete()

ht.set("country", "Armenia");
ht.delete("country");

test("Delete: removes key", ht.has("country") === false);
test("Delete: decreases size", ht.getSize() === 3);

ht.delete("unknown");

test("Delete: missing key does not change size", ht.getSize() === 3);

// 10. keys()

const keys = [...ht.keys()].sort();

test(
    "Keys: returns all keys",
    sameArray(keys, ["age", "city", "name"])
);

// 11. values()

const values = [...ht.values()].sort();

test(
    "Values: returns all values",
    sameArray(values, [20, "Anna", "Yerevan"].sort())
);

// 12. entries()

const entries = [...ht.entries()];

test(
    "Entries: returns key-value pairs",
    entries.length === 3 &&
    entries.every(entry =>
        Array.isArray(entry) && entry.length === 2
    )
);

// 13. Symbol.iterator

const iteratorEntries = [...ht];

test(
    "Symbol.iterator: returns all entries",
    iteratorEntries.length === 3 &&
    iteratorEntries.every(entry =>
        Array.isArray(entry) && entry.length === 2
    )
);

// 14. resize()

const resizeTable = new HashTable(5, 0.75);

resizeTable.set("a", 1);
resizeTable.set("b", 2);
resizeTable.set("c", 3);
resizeTable.set("d", 4);

// At this point load factor is 4 / 5 = 0.8.
// Resize should have happened automatically.

test("Resize: increases capacity", resizeTable.Capacity > 5);
test("Resize: preserves all elements", resizeTable.getSize() === 4);
test("Resize: preserves key a", resizeTable.get("a") === 1);
test("Resize: preserves key b", resizeTable.get("b") === 2);
test("Resize: preserves key c", resizeTable.get("c") === 3);
test("Resize: preserves key d", resizeTable.get("d") === 4);

// 15. clear()

const oldCapacity = resizeTable.Capacity;

resizeTable.clear();

test("Clear: size becomes zero", resizeTable.getSize() === 0);
test("Clear: load factor becomes zero", resizeTable.loadFactor() === 0);
test("Clear: all keys are removed", resizeTable.has("a") === false);
test("Clear: capacity remains unchanged", resizeTable.Capacity === oldCapacity);
test("Clear: all buckets are empty", resizeTable.table.every(bucket => bucket.length === 0));

console.log("All tests finished!");


