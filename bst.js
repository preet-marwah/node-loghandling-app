"use strict";
/*
 * Binary search tree data structure
 *
 * public methods:
 *
 *   insert(k, v)  inserts key k with value v if not already there
 *   lookup(k)     returns value associated with key k
 *                 or null if not found
 *   range(k1, k2) returns an array of all values between k1 and k2 ## hash tables cannot do
 *                 returns [] if no results
 *                 (inclusive of k1 and k2)
 *   remove(k)     removes key k and associated value
 */

class BST {

    constructor() {
        this.root = null;
    }

    insert(key, value) {
        const newNode = {
            left: null,
            right: null,
            key: key,
            value: value,
        };

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let parentNode = null;
        let currentNode = this.root;
        //currentNode.key has some sort of key
        while (currentNode != null) {

            parentNode = currentNode;
            if (key < currentNode.key) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        if (key < parentNode.key) {
            parentNode.left = newNode;
        } else {
            parentNode.right = newNode;
        }
    }

    lookup(key) {
        if (this.root === null) {
            return null;
        } else {
            let currentNode = this.root;
            while (currentNode !== null) {
                if (key === currentNode.key) {
                    return currentNode.value;
                } else if (key < currentNode.key) {
                    currentNode = currentNode.left;
                } else {
                    currentNode = currentNode.right;
                }

            }
            return null;
        }
    }


}
module.exports = BST;
