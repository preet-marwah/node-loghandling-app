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

    length(){
        return this.qLength;
    }
 }

 module.exports = Queue;