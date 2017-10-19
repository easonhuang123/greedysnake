export default class Chain {
    constructor(arr = []) {
        this.chain = []
        this.chain.length = arr.length
        for (let i = 0; i < arr.length; i++) {
            this.chain[i] = {
                index: i,
                element: arr[i],
                prev: i - 1,
                next: i < arr.length - 1 ? i + 1 : -1
            }
        }
        this.length = this.chain.length
        this.head = arr.length ? 0 : -1
        this.tail = arr.length ? arr.length - 1 : -1
        this.free = arr.length
        this.freeList = []
        this[Symbol.iterator] = () => {
            let that = this, cur = that.chain[this.head]
            return (function* () {
                while (cur !== undefined) {
                    yield cur
                    cur = that.chain[cur.next]
                }
            }())
        }
    }
    
    toString () {
        let current = this.head
        let string = ''

        while (current !== -1) {
            string += this.chain[current].element + (this.chain[current].next !== -1 ? ',' : '')
            current = this.chain[current].next
        }

        console.log(string)
    }

    unshift (element) {
        let sec = this.head
        this.head = this.free
        this.chain[this.head] = {
            index: this.head,
            prev: -1,
            next: sec,
            element: element
        }
        if (sec !== -1) {
            this.chain[sec].prev = this.head
        } else {
            this.tail = this.head
        }
        this.calloc()
        this.length++
    }

    pop () {
        this.collection()
        this.free = this.tail
        this.tail = this.chain[this.tail].prev
        this.tail !== -1 && (this.chain[this.tail].next = -1)
        --this.length === 0 && (this.head = -1)
        return this.chain[this.free]
    }

    calloc() {
        this.free = this.freeList.length ? this.freeList.pop() : this.chain.length
    }

    collection() {
        this.freeList.push(this.free)
    }
}

