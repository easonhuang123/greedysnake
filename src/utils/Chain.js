import "babel-polyfill"

export default class Chain {
    constructor(arr = []) {
        // 用于存放链表的数组
        this.chain = []
        this.chain.length = arr.length
        // 将初始化的数组“转化”为双向链表，每个数组元素代表一个链表节点
        for (let i = 0; i < arr.length; i++) {
            this.chain[i] = {
                // 节点指针值
                index: i,
                // 节点数据
                element: arr[i],
                // 上一个节点指针值
                prev: i - 1,
                // 下一个节点指针值
                next: i < arr.length - 1 ? i + 1 : -1
            }
        }
        // 链表的长度
        this.length = this.chain.length
        // 头指针
        this.head = arr.length ? 0 : -1
        // 尾指针
        this.tail = arr.length ? arr.length - 1 : -1
        // 空指针
        this.free = arr.length
        // 用于存放空指针的数组，用于回收无用的指针
        this.freeList = []
        // 迭代器，遍历整个链表
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
    
    // 输出链表的字符串 (1,2,3,...)
    toString () {
        let current = this.head
        let string = ''

        while (current !== -1) {
            string += this.chain[current].element + (this.chain[current].next !== -1 ? ',' : '')
            current = this.chain[current].next
        }

        console.log(string)
    }

    // 删除头节点
    shift() {
        this.collection()
        // 空指针指向头指针，准备回收
        this.free = this.head
        // 头指针指向下一个
        this.head = this.chain[this.head].next
        // 若下一个指针存在则头节点的上一个指针值为-1
        this.head !== -1 && (this.chain[this.head].prev = -1)
        // 若链表长度-1后为零则尾指针值为-1
        --this.length === 0 && (this.tail = -1)
        // 返回原头节点
        return this.chain[this.free]
    }

    // 插入头节点
    unshift(element) {
        // 原来的头指针
        let sec = this.head
        // 头指针指向一个空指针
        this.head = this.free
        // 初始化头指针
        this.chain[this.head] = {
            index: this.head,
            prev: -1,
            next: sec,
            element: element
        }
        // 若原头指针存在则将原头节点的上一个指针指向新的头指针
        if (sec !== -1) {
            this.chain[sec].prev = this.head
        } else {
            // 否则原链表为空，现在只有一个节点，头指针等于尾指针
            this.tail = this.head
        }
        // 获取新的空指针
        this.calloc()
        // 链表长度+1
        this.length++
    }

    // 新增尾节点
    push (element) {
        let last = this.tail
        // 尾指针指向空指针
        this.tail = this.free
        // 并初始化新的尾指针
        this.chain[this.tail] = {
            index: this.tail,
            prev: last,
            next: -1,
            element: element
        }
        // 若原尾指针存在则将原尾节点的下一个指针指向新的尾指针
        if (last !== -1) {
            this.chain[last].next = this.tail
        } else {
            // 否则原链表为空，现在只有一个节点，头指针等于尾指针
            this.head = this.tail
        }
        // 获取新的空指针
        this.calloc()
        // 链表长度+1
        this.length++
    }

    // 删除尾节点
    pop () {
        this.collection()
        // 空指针指向尾指针，准备回收
        this.free = this.tail
        // 尾指针指向它的上一个指针
        this.tail = this.chain[this.tail].prev
        // 若上一个指针存在则头节点的上一个指针值为-1
        this.tail !== -1 && (this.chain[this.tail].next = -1)
        // 若链表长度-1后为零则头指针值为-1
        --this.length === 0 && (this.head = -1)
        // 返回原尾节点
        return this.chain[this.free]
    }

    // 返回头节点
	first() { 
		return this.chain[this.head]
	}

    // 返回尾节点
	last() {
		return this.chain[this.tail]
	}

    // 动态分配空指针
    calloc() {
        // 空指针指向新的位置
        this.free = this.freeList.length ? this.freeList.pop() : this.chain.length
    }

    // 回收空指针
    collection() {
        // 将空指针放到一个空指针数组中
        this.freeList.push(this.free)
    }
}

