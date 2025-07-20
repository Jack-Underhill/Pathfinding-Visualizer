export class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this.bubbleUp();
    }

    dequeue() {
        if(this.isEmpty()) return null;

        const top = this.heap[0];
        const end = this.heap.pop();

        if(!this.isEmpty()) {
            this.heap[0] = end;
            this.bubbleDown();
        }

        return top.value;
    }

    bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];

        while(idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];

            if(element.priority >= parent.priority) break;

            this.heap[idx] = parent;
            this.heap[parentIdx] = element;
            idx = parentIdx;
        }
    }

    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while(true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swapIdx = null;

            if (leftIdx < length) {
                if (this.heap[leftIdx].priority < element.priority) {
                    swapIdx = leftIdx;
                }
            }

            if (rightIdx < length) {
                if ((swapIdx === null && this.heap[rightIdx].priority < element.priority) ||
                    (swapIdx !== null && this.heap[rightIdx].priority < this.heap[leftIdx].priority)) 
                {
                    swapIdx = rightIdx;
                }
            }

            if (swapIdx === null) break;

            this.heap[idx] = this.heap[swapIdx];
            this.heap[swapIdx] = element;
            idx = swapIdx;
        }
    }
}