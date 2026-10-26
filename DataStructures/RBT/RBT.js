const RED = 'RED';
const BLACK = 'BLACK';

class TreeNode {
    constructor(data, color = RED, parent = null, left = null, right = null) {
        this.data = data;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class RBTree {
    constructor() {
        this.nil = new TreeNode(null);
        this.nil.color = BLACK;
        this.root = this.nil;
    }

    rightRotate(y) {
        let x = y.left;
        let T = x.right;
        let parent = y.parent;
        if(parent === this.nil){
            this.root = x;
        }else if(parent.left === y){
            parent.left = x;
        }else{
            parent.right = x;
        }

        y.left = T;
        if(T !== this.nil){
            T.parent = y;
        }

        x.right = y;
        y.parent = x;
        x.parent = parent;
        return x;
    }

    leftRotate(y) {
        let x = y.right;
        let T = x.left;
        let parent = y.parent;
        if(parent === this.nil){
            this.root = x;
        }else if(parent.left === y){
            parent.left = x;
        }else{
            parent.right = x;
        }

        y.right = T;
        if(T !== this.nil){
            T.parent = y;
        }

        x.left = y;
        y.parent = x;
        x.parent = parent;
        return x;
    }

    insertFixUp(newNode) {

        while(newNode.parent.color === RED){
            let gp = newNode.parent.parent;
            if(newNode.parent === gp.left){
                let uncle = gp.right;
                if(uncle.color === RED){
                    uncle.color = newNode.parent.color = BLACK;
                    gp.color = RED;
                    newNode = gp;
                }else{
                    if(newNode.parent.right === newNode){
                        newNode = newNode.parent;
                        this.leftRotate(newNode);
                    }
                    newNode.parent.color = BLACK;
                    gp = newNode.parent.parent;
                    gp.color = RED;
                    this.rightRotate(gp);
                }
            }else{
                let uncle = gp.left;
                if(uncle?.color == RED){
                    uncle.color = newNode.parent.color = BLACK;
                    gp.color = RED;
                    newNode = gp;
                }else{
                    if(newNode.parent.left === newNode){
                        newNode = newNode.parent;
                        this.rightRotate(newNode);
                    }
                    newNode.parent.color = BLACK;
                    gp = newNode.parent.parent;
                    gp.color = RED;
                    this.leftRotate(gp);
                }
            }
        }
        this.root.color = BLACK;
    }

    insert(data) {
        const newNode = new TreeNode(data);
        let cur = this.root;
        let parentNode = this.nil;
        while(cur !== this.nil){
            parentNode = cur;
            if(data > cur.data){
                cur = cur.right;
            }else if(data < cur.data){
                cur = cur.left;
            }else{
                return;
            }
        }
        if(parentNode === this.nil){
            this.root = newNode;
        }else if(newNode.data > parentNode.data){
            parentNode.right = newNode;
        }else{
            parentNode.left = newNode;
        }
        newNode.parent = parentNode;
        newNode.left = newNode.right = this.nil;
        this.insertFixUp(newNode);
        
    }
printTree(node = this.root, prefix = "", isLeft = true) {
    if (node === this.nil) return;

    if (node.right !== this.nil) {
        this.printTree(
            node.right,
            prefix + (isLeft ? "│   " : "    "),
            false
        );
    }

    console.log(
        prefix +
        (isLeft ? "└── " : "┌── ") +
        `${node.data} (${node.color})`
    );

    if (node.left !== this.nil) {
        this.printTree(
            node.left,
            prefix + (isLeft ? "    " : "│   "),
            true
        );
    }
}
}

const rb = new RBTree();

rb.insert(10);
rb.insert(20);
rb.insert(30);
rb.insert(15);
rb.insert(25);
rb.insert(5);

rb.printTree();
