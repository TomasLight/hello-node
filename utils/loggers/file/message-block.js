class MessageBlock {
    constructor() {
        this.isCompleted = false;
        this.isCorrupted = false;
        this.isFinished = false;
        this.lines = [];
    }

    append(message) {
        this.lines.push(message);
    }

    end() {
        this.isCompleted = true;
    }

    finish() {
        this.isFinished = true;
    }

    fail() {
        this.isCorrupted = true;
    }
}

export { MessageBlock };
