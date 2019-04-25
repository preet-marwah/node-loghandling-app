const Queue = require('./queue');

describe("test the length method", () => {

    const q = new Queue();

    test("list initially empty", () => {
        expect(q.length()).toBe(0);
    });

    test("adding nodes increases length",() => {
        q.add('node');
        expect(q.length()).toBe(1);
        q.add('node');
        expect(q.length()).toBe(2);
        q.add('node');
        expect(q.length()).toBe(3);
        q.add('node');
        expect(q.length()).toBe(4);
    });
    test("remove decreases length", () => {
        q.remove();
        expect(q.length()).toBe(3);
        q.remove();
        expect(q.length()).toBe(2);
        q.remove();
        expect(q.length()).toBe(1);
        q.remove();
        expect(q.length()).toBe(0);
        q.remove();
        expect(q.length()).toBe(0);
    });

    test("add increases length", () => {
        q.add('test');
        expect(q.length()).toBe(1);
        q.add('test');
        expect(q.length()).toBe(2);
        q.add('test');
        expect(q.length()).toBe(3);
        q.add('test');
        expect(q.length()).toBe(4);
    });

    test("remove decreases length", () => {
        q.remove();
        expect(q.length()).toBe(3);
        q.remove();
        expect(q.length()).toBe(2);
        q.remove();
        expect(q.length()).toBe(1);
        q.remove();
        expect(q.length()).toBe(0);
        q.remove();
        expect(q.length()).toBe(0);
    });

});

describe("queue max length of 1 item", () => {

    const q = new Queue();

    test("sequence", () => {
        expect(q.remove()).toBe(undefined);
        q.add('node');
        expect(q.remove()).toBe('node');
        q.add('node');
        expect(q.remove()).toBe('node');
        q.add('1');
        expect(q.remove()).toBe('1');
        q.add('');
        expect(q.remove()).toBe('');
        q.add(null);
        expect(q.remove()).toBe(null);
    });
});

describe("remove items in FIFO order", () => {
    const q = new Queue();

    test("queue has up to 2 items", () => {
        expect(q.remove()).toBe(undefined);
        q.add('test1');
        q.add('test2');
        expect(q.remove()).toBe('test1');
        expect(q.remove()).toBe('test2');

        expect(q.remove()).toBe(undefined);

        q.add('test1');
        q.add('test2');
        expect(q.remove()).toBe('test1');
        q.add('test3');
        expect(q.remove()).toBe('test2');
        expect(q.remove()).toBe('test3');
        expect(q.remove()).toBe(undefined);

    });

    test("queue has many items", () => {
        expect(q.remove()).toBe(undefined);
        q.add('test1');
        q.add('test2');
        q.add('test3');
        q.add('test4');

        expect(q.remove()).toBe('test1');
        expect(q.remove()).toBe('test2');
        expect(q.remove()).toBe('test3');
        q.add('test5');
        expect(q.remove()).toBe('test4');
        expect(q.remove()).toBe('test5');
        expect(q.remove()).toBe(undefined);

    });

    test("stress test", () => {
        for (let i = 0; i < 1000; i++) {
            q.add('test' + i);
        }
        for (let i = 0; i < 1000; i++) {
            expect(q.remove()).toBe('test' + i);
        }
        expect(q.remove()).toBe(undefined);

    });

});

describe("toArray()", () => {
    
    
    test("list empty", () => {
        const q = new Queue();
        expect(q.toArray()).toEqual([]);

        q.add('something');
        q.remove();

        expect(q.toArray()).toEqual([]);
    });
    test("one item", () => {
        const q = new Queue();
        q.add('one');

        expect(q.toArray()).toEqual(['one']);
        q.add('1');
        q.remove();

        expect(q.toArray()).toEqual(['1']);

    });

     

    test("two items", () => {
        const q = new Queue();
        q.add('1');
        q.add('2');

        expect(q.toArray()).toEqual(['1', '2']);
        q.remove();

        q.add('3');

        expect(q.toArray()).toEqual(['2', '3']);

    });

    test("lots of items", () => {
        const q = new Queue();
        q.add('1');
        q.add('2');
        q.add('3');
        q.add('4');
        q.add('5');
        q.add('6');
        q.add('7');


        expect(q.toArray()).toEqual(['1','2','3','4','5','6','7']);
        q.remove();
        expect(q.toArray()).toEqual(['2','3','4','5','6','7']);
        q.remove();

        expect(q.toArray()).toEqual(['3','4','5','6','7']);

        q.add('8');
        expect(q.toArray()).toEqual(['3','4','5','6','7', '8']);


    });
   
});
