class AvlNode {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  constructor(value) {
    this.root = value === undefined || value === null ? null : new AvlNode(value);
  }

  _getHeight(node) {
    if(!node) return 0;
    return node.height;
  }

  _update(node) {
    node.height = Math.max(this._getHeight(node.left),this._getHeight(node.right))+1;
  }

  _bf(node) {
    return this._getHeight(node.left) - this._getHeight(node.right);
  }

  _getMin(node) {
    if(!node)return null;
    let cur = node;
    while(cur.left){
        cur = cur.left;
    }
    return cur.data;
  }

  _rotateRight(y) {
    let x = y.left;
    let T = x.right;

    x.right = y;
    y.left = T;
    this._update(y);
    this._update(x);
    return x;
  }

  _rotateLeft(y) {
    let x = y.right;
    let T = x.left;

    x.left = y;
    y.right = T;
    this._update(y);
    this._update(x);
    return x;
  }

  _insert(node, value) {
    if(!node)   return new AvlNode(value);
    if(value < node.data){
        node.left = this._insert(node.left,value) 
    }else if(value > node.data){
        node.right = this._insert(node.right,value);
    }else{
        return node;
    }
    this._update(node);
    const bf = this._bf(node);
    if(bf > 1 && this._bf(node.left) >= 0){
      return this._rotateRight(node);
    }else if(bf > 1 && this._bf(node.left) < 0){
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }else if(bf < -1 && this._bf(node.right) > 0){
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }else if(bf < -1 && this._bf(node.right) <= 0){
      return this._rotateLeft(node);
    }
    return node;
  }

  insertRecursive(value) {
    this.root = this._insert(this.root,value);
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
        node.data = this._getMin(node.right);
        node.right = this._remove(node.right,node.data);
      }
  }
    this._update(node);
    const bf = this._bf(node);
    if(bf > 1 && this._bf(node.left) >= 0){
      return this._rotateRight(node);
    }else if(bf > 1 && this._bf(node.left) < 0){
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }else if(bf < -1 && this._bf(node.right) > 0){
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }else if(bf < -1 && this._bf(node.right) <= 0){
      return this._rotateLeft(node);
    }

    return node;
  }

  removeRecursive(val){
    if(!this.root) return;
      this.root = this._remove(this.root,val);
  }


  inorder(node,res) {
    if(!node) return;

    this.inorder(node.left,res);
    res.push(node.data);
    this.inorder(node.right,res);
  }
  inorderRecursive(){
    if(!this.root) return [];
    let result = [];
    this.inorder(this.root,result);
    return result;
  }

  preorder(node,res) {
    if(!node) return;
    res.push(node.data);
    this.preorder(node.left,res);
    this.preorder(node.right,res);
  }
  preorderRecursive(){
    if(!this.root) return [];
    let result = [];
    this.preorder(this.root,result);
    return result;
  }

  postorder(node,res) {
    if(!node) return;

    this.postorder(node.left,res);
    this.postorder(node.right,res);
    res.push(node.data);
  }
  postorderRecursive(){
    if(!this.root) return [];
    let result = [];
    this.postorder(this.root,result);
    return result;
  }

  levelorder(node,res,level) {
    if(!node) return;
    if(!res[level]){
      res[level] = [];
    }
    res[level].push(node.data);
    this.levelorder(node.left,res,level+1);
    this.levelorder(node.right,res,level+1);
  }
  levelorderRecursive(){
    if(!this.root) return [];
    let result = [];
    this.levelorder(this.root,result,0);
    return result;
  }
  printTree(node = this.root, prefix = "", isTail = true) {
  if (!node) return;

  const info = `(bf: ${this._bf(node)}, height: ${node.height})`;

  if (node.right) {
    this.printTree(
      node.right,
      prefix + (isTail ? "│   " : "    "),
      false
    );
  }

  console.log(
    prefix + (isTail ? "└── " : "┌── ") +
    `${node.data} ${info}`
  );

  if (node.left) {
    this.printTree(
      node.left,
      prefix + (isTail ? "    " : "│   "),
      true
    );
  }
}
}

const avl = new AVL();
avl.insertRecursive(30);
avl.insertRecursive(20);
avl.insertRecursive(10);
avl.insertRecursive(35);
avl.printTree();
avl.removeRecursive(10);
avl.printTree();



