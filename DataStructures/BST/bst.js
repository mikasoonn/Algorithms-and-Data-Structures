const { Queue } = require("../Queue/Queue.js");
const { Stack } = require("../Stack/Stack.js");

class TreeNode { 
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    } 
}

class BST {
    #root = null; 
    constructor() {

    }
_insert(node, value) {

    if(!node)   return new TreeNode(value);
    if(value < node.data){
        node.left = this._insert(node.left,value) 
    }else if(value > node.data){
        node.right = this._insert(node.right,value);
    }else{
        return node;
    }

    return node;
}

_contains(node, value) {
    if(!node) return false;
    if(node.data === value) return true;
    if(value < node.data){
        return this._contains(node.left,value);
    }else if(value > node.data){
        return this._contains(node.right,value);
    }
}
_inOrder(node, result) {
    if(!node) return;
    this._inOrder(node.left,result);
    result.push(node.data);
    this._inOrder(node.right,result);
}

_preOrder(node, result) {
    if(!node) return;
    result.push(node.data);
    this._preOrder(node.left,result);
    this._preOrder(node.right,result);

}

_postOrder(node, result) {
    if(!node) return;
    this._postOrder(node.left,result);
    this._postOrder(node.right,result);
    result.push(node.data);
}

_levelOrder(node, result,level) {
    if(!node) return;
    if(!result[level]){
        result[level] = [];
    }
    result[level].push(node.data);
    this._levelOrder(node.left,result,level+1);
    this._levelOrder(node.right,result,level+1);
}

_remove(node, value) {
    if(!node) return null;
    if(value < node.data){
        node.left = this._remove(node.left,value);
    }else if(value > node.data){
        node.right = this._remove(node.right,value);
    }else{
        if(!node.left && !node.right) return null;
        if(!node.left || !node.right) return node.left || node.right;
        else{
            node.data = this.getMax(node.left);
            node.left = this._remove(node.left,node.data);
        }
    }
    return node;
}

getMin(node) {
    if(!node)return null;
    let cur = node;
    let min = cur.data;
    while(cur){
        if(cur.data < min){
            min = cur.data;
        }
        cur = cur.left;
    }
    return min;
}  
getMax(node) {
    if(!node)return null;
    let cur = node;
    let max = cur.data;
    while(cur){
        if(cur.data > max){
            max = cur.data;
        }
        cur = cur.right;
    }
    return max;
}

insertRecursive(value) {
    
    this.#root = this._insert(this.#root,value);
}

containsRecursive(value) {
    return this._contains(this.#root,value);
}

inOrderIterative() {
    const result = [];
    if(!this.#root) return result;
    const stack = new Stack();
    let cur = this.#root;
    while(cur || stack.size){
        
        while(cur){
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        result.push(cur.data);
        cur = cur.right;
    }
    return result;

}

postOrderIterative() {
    const result = [];
    if(!this.#root) return result;
    const stack1 = new Stack();
    stack1.push(this.#root);
    const stack2 = new Stack();
    while(stack1.size){
        let cur = stack1.pop();
        stack2.push(cur);
        if(cur.left) stack1.push(cur.left);
        if(cur.right) stack2.push(cur.right);
    }
    while(stack2.size){
        result.push(stack2.pop().data);
    }
    return result;
}

preorderIterative() {
    const result = [];
    if(!this.#root) return result;
    const stack = new Stack();
    stack.push(this.#root);
    while(stack.size){
        let cur = stack.pop();
        if(cur.right)stack.push(cur.right);
        if(cur.left)stack.push(cur.left);
        result.push(cur.data);
    }
    return result;
}

levelOrderIterative() {
    const result = [];
    if(!this.#root){
        return result;
    }

    const queue = new Queue();
    queue.enqueue(this.#root);
    let levelCount = 0;
    while(queue.size){
        let levelSize = queue.size;
        for(let i = 0; i < levelSize;i++){
            let cur = queue.dequeue();
            if(cur.left) queue.enqueue(cur.left);
            if(cur.right) queue.enqueue(cur.right);
            result.push(cur.data);
        }
        levelCount++;
    }
    console.log(`The level count is: ${levelCount}\n`);
    return result;
    
}

levelOrderRecursive() {
    const result = [];
    if(!this.#root) return result;
    this._levelOrder(this.#root,result,0);
    return result.flat();
}

inOrderRecursive() {
	const result = [];
    if(!this.#root) return result;
    this._inOrder(this.#root,result);
	return result;
}

preOrderRecursive() {
	const result = [];
    if(!this.#root) return result;
    this._preOrder(this.#root,result);
    return result;
}

postOrderRecursive() {
    const result = [];
    if(!this.#root) return result;
    this._postOrder(this.#root,result);
    return result;
}

removeRecursive(value) {
    if(!this.#root){
        return;
    }

    this.#root = this._remove(this.#root,value);

}

insert(value) {
    if(!this.#root){
        this.#root = new TreeNode(value);
        return;
    } 
    let cur = this.#root;
    let parent = null;
    while(cur){
        if(value > cur.data) {
            parent = cur;
            cur = cur.right;
        }else if(value < cur.data){
            parent = cur;
            cur = cur.left;
        }else{
            return;
        }
    }
    if(value < parent.data){
        parent.left = new TreeNode(value);
    }else{
        parent.right = new TreeNode(value);
    }

}

contains(value) {
    if(!this.#root)return false;
    let cur = this.#root;
    while(cur){
        if(value === cur.data) return true;
        if(value < cur.data) cur = cur.left;
        else if(value > cur.data) cur = cur.right;
        
    }
    return false;
}

}


const bst = new BST();


[15, 10, 20, 5, 12, 17, 25,7].forEach(value => {
    bst.insertRecursive(value);
});

console.log(bst.inOrderRecursive());
// [5, 10, 12, 15, 17, 20, 25]

console.log(bst.preOrderRecursive());
// [15, 10, 5, 12, 20, 17, 25]

console.log(bst.postOrderRecursive());
// [5, 12, 10, 17, 25, 20, 15]
bst.insert(45);
console.log("added");
console.log(bst.postOrderRecursive());


// console.log(bst.preOrderRecursive());
// console.log(bst.containsRecursive(21));
// console.log(bst.contains(20));
// bst.removeRecursive(25);
// console.log(bst.contains(25));
// console.log(bst.levelOrderIterative());
// console.log(bst.levelOrderRecursive());
// console.log(bst.preorderIterative());
// console.log(bst.inOrderIterative());
// console.log(bst.postOrderIterative());
// console.log(bst.levelOrderRecursive());

