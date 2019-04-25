"use strict";
/*
 * Queue data structure (FIFO - first in first out)
 *
 * public methods:
 *
 *   add(i)    adds item i to the end queue
 *   remove()  removes an item from the front of the queue
 *             and returns it
 *             - if there are no items in the queue,
 *               return undefined
 *   toArray() returns an array of the items starting with the first
 *   length()  returns current list length
 */

 class Queue {

    constructor(){
        this.qLength = 0;
        this.first = null;
        this.last = null;
    }
    //method to add new nodes to the (FIFO) Queue
    add(value){

        this.qLength++;

        //as Queue is collection of nodes, create a new node
        //also it's implementation is in FIFO so the new node is to be added at last node

        const newNode = {
            before:this.last,
            after:null,
            value:value,
        }

        //check if the Queue is empty and then set the new node as first node

        if(this.last ===null){
            this.first = newNode;
        } else{ /* if the Queue is not empty then set the after pointer of the last node
                    to the new node */
        this.last.after = newNode;
        }
        // set the last pointer to the new node
        this.last = newNode;

    }

    //method to remove nodes from the (FIFO) Queue

    remove(){
        /*as it's FIFO so just need to remove the first node and 
        adjust the next node in the Queue to be the first node after 
        the removal of the first node.*/

        const firstNode = this.first;

        //check if Queue is empty then return undefined

        if (firstNode === null){
            return undefined;
        }

        //make this.first point to next node
        this.first = firstNode.after;

        //check if the Queue only had one node
        if(this.first === null){
            this.last = null;
        }

        this.qLength--;

        return firstNode.value;
    }

    toArray(){
        const result = [];

        let thisNode = this.first;
        while (thisNode !== null){
            result.push(thisNode.value);
            thisNode = thisNode.after;
        }

        return result;
    }


    // method to return length of the queue
    length(){
        return this.qLength;
    }
 }

 module.exports = Queue;