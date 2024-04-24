export class Node{
    constructor(key, value){
        this.value = value,
        this.key = key,
        this.next = null;
    }
}

export class LinkedList{
    constructor(head = null){
        this.head = head
    }

    append(node) {
        let prevNode = this.tail();
        prevNode.next = node;
    }

    prepend(node){
        let prevNode = this.head;
        this.head = node;
        node.next = prevNode; 

    }

    size(){
        let size = 1;
        let nodeList = this.head;
        while(nodeList.next != null){
            nodeList = nodeList.next;
            size++;
        }
        return size;
    }

    head(){
        return this.head
    }

    tail(){
        let nodeList = this.head;
        while(nodeList.next != null){
            nodeList = nodeList.next;
        }
        return nodeList;
    }

    at(index){
        let nodeIndex = 0;
        let node = this.head;
        while(nodeIndex != index && node.next != null){
            node = node.next;
            nodeIndex++;
        }

        if(nodeIndex != index) return undefined;

        return node;
    }

    pop(){
        let node = this.head;
        if (!node) {
            return;
        }

        if (node.next === null) {
            this.head = null;
            return;
        }

        while (node.next.next !== null) {
            node = node.next;
        }
        node.next = null;
    }

    contains(val){
        let node = this.head;
        while(node.value != val && node.next != null){
            node = node.next;
        };
        return node.value === val ? true : false;

    }

    find(val){
        let index = 0;
        let node = this.head;
        while(node.key != val && node.next != null){
            node = node.next;
            index++;
        }
        
        return node.key === val ? index : undefined;
    }

    toString(){
        let node = this.head;
        let string = '[Head]';
        while(node.next != null){
            string += `(${node.value}) -> `;
            node = node.next;
        }
        string += `(${node.value}) -> null`;
        return string;
    }

    insertAt(node, index){
        let displacedNode = this.at(index);
        let prevNode = this.at(index - 1);

        if(index === 0){
            this.prepend(node);
            return;
        }

        if(displacedNode === undefined){
            this.append(node);
            return;
        }

        node.next = displacedNode;
        prevNode.next = newNode;
    }

    removeAt(index){
        let prevNode = this.at(index - 1);
        let nextNode = this.at(index + 1);

        if(index === 0){
            this.head = nextNode;
            return;
        }

        if(nextNode === undefined){
            this.pop();
        }

        prevNode.next = nextNode;
    }
}