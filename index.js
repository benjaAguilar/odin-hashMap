import { Node, LinkedList } from "./linkedLists.js";

class HashMap{
    constructor(arrSize){
        this.arr = new Array(arrSize);
        this.size = 0;
        this.growFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    } 

    //test if the array has to grow
    hasToGrow(){
        if(Math.round(this.arr.length * this.growFactor) <= this.size){
            this.arr.push(undefined);
            console.log('grows');
        }
    }

    set(key, value){
        let node = new Node(key, value);
        let hashKey = this.hash(key);
        let index = hashKey % this.arr.length;
        //fix to make less calls
        let linkedList = this.arr[index];
        
        let prevNodesIndex;
        this.hasToGrow();

        //if a linked list already exists check if a key is duplicated
        if(linkedList != undefined) prevNodesIndex = linkedList.find(key);

        //replace if it is duplicated
        if(prevNodesIndex != undefined){ 
            linkedList.insertAt(node, prevNodesIndex);
            linkedList.removeAt(prevNodesIndex + 1);
            return;
        } 

        //if not duplicated add to the nodes list
        if(linkedList != undefined){
            linkedList.append(node);
            this.size++;
            return;
        }

        //if linked list does not exist create new one on the index and append the new node
        this.size++;
        return this.arr[index] = new LinkedList(node);
    }

    getList(key){
        let hashKey = this.hash(key);
        let index = hashKey % this.arr.length;
        let linkedList = this.arr[index];

        return linkedList;
    }

    getElement(key){
        let linkedList = this.getList(key);

        if(linkedList === undefined) return null;

        //if linked list exists get the specific value 
        let i = linkedList.find(key);
        if(i === undefined) return null;

        let node = linkedList.at(i);
        return node;
    }

    get(key){
        let node = this.getElement(key);
        return node === null ? null : node.value;
    }

    has(key){
        return this.get(key) === null ? false : true;
    }

    remove(key){
        let hashKey = this.hash(key);
        let index = hashKey % this.arr.length;
        let node = this.getElement(key);
        let list = this.getList(key);

        if(node === null || list === undefined) return false;

        //if there is one element in the bucket empty the space
        if(list.size() <= 1){
            this.arr[index] = undefined;
            this.size--;
            return true;
        }

        //if there is more than one element
        let i = list.find(key);
        list.removeAt(i);
        return true;
    }

    length(){
        return this.size;
    }

    clear(){
        this.arr = new Array(16);
    }

    collect(){
        let keys = [];
        let values = [];
        let keysAndVal = [];
        this.arr.forEach(list => {
            let bucket = list.head;

            //if bucket exists enter here
            if(bucket != undefined){
                //if the lined list is bigger than one iterate over the list
                if(list.size() > 1){
                    while(bucket.next != null){
                        keys.push(bucket.key);
                        values.push(bucket.value);
                        keysAndVal.push([bucket.key, bucket.value]);
                        bucket = bucket.next;
                    }
                } else{
                    keys.push(bucket.key);
                    values.push(bucket.value);
                    keysAndVal.push([bucket.key, bucket.value]);
                }
            }
        });
        return {
            keys,
            values,
            keysAndVal
        }
    }

    keys(){
        let data = this.collect();
        return data.keys;
    }

    values(){
        let data = this.collect();
        return data.values;
    }

    entries(){
        let data = this.collect();
        return data.keysAndVal;
    }

}
//Create a hashMap
let myMap = new HashMap(16);

//Overwrite values specifying the same key!
myMap.set('dark', 'on dark mode!');
myMap.set('dark', 'new val!');
console.log(myMap.arr[6].toString());

//if has the same index add to the linked list!
myMap.set('carlx', 'im carlo');
myMap.set('', 'nutricion');
console.log(myMap.arr[0].toString());

//get the values even if there are chained!
console.log(myMap.get(''));

//check if a key exists
console.log(myMap.has('dark')); //true
console.log(myMap.has('ruby')); //false

//remove a key!
console.log(myMap.remove(''));
console.log(myMap.arr[0]);

//show keys, values and entries!
console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.entries());