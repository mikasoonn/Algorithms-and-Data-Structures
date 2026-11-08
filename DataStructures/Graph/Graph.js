class Graph {
    constructor(size, isDirected = false) {
        this.size = size;
        this.isDirected = isDirected;
        this.matrix =  Array.from({length:size}, ()=> new Array(size).fill(0));
        this.verteces = [];
    }

    addVertex(name) {
        if(this.verteces.includes(name)){
            return "The Name already exists";
        }
        if(this.verteces.length === this.matrix.length){
            for(const row of this.matrix){
            row.push(0);
        }
        this.size++;
        this.matrix.push(new Array(this.size).fill(0));
        }
        this.verteces.push(name);
    }

    addEdge(u, v) {
        const uIndex = this.verteces.indexOf(u); 
        const vIndex = this.verteces.indexOf(v); 
        if(this.isDirected){
            this.matrix[uIndex][vIndex] = 1;
        }else{
            this.matrix[uIndex][vIndex] = 1;
            this.matrix[vIndex][uIndex] = 1;
        }

    }

    print() {
        for(let i = 0; i < this.matrix.length; i++){
            console.log(this.matrix[i]);
        }
    }
    BFS(start){
        // start -> Name
        const queue = [this.verteces.indexOf(start)];
        const res = [];
        const visited = new Array(this.size).fill(false);
        visited[this.verteces.indexOf(start)] = true;
        while(queue.length){
            const current = queue.shift();
            res.push(this.verteces[current]);
            for(let i = 0; i < this.size; i++){
                if(this.matrix[current][i] === 1 && !visited[i]){
                    queue.push(i);
                    visited[i] = true;
                }
            }

        }
        return res;
    }
}

const graph = new Graph(5);

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");

console.log("Vertices:", graph.verteces);
graph.print();

console.log("BFS from A:", graph.BFS("A"));
console.log("BFS from B:", graph.BFS("B"));
console.log("BFS from D:", graph.BFS("D"));

const directed = new Graph(4, true);

directed.addVertex("A");
directed.addVertex("B");
directed.addVertex("C");
directed.addVertex("D");

directed.addEdge("A", "B");
directed.addEdge("A", "C");
directed.addEdge("B", "D");

directed.print();

console.log("BFS from A:", directed.BFS("A"));
console.log("BFS from D:", directed.BFS("D"));