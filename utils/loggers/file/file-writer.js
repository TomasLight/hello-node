import path from "path";
import fs from "fs";

class FileWriter {
    /**
     * In milliseconds
     * @type {number}
     */
    static WRITE_ATTEMPT_TIMEOUT = 200;

    constructor() {
        const root = path.dirname(require.main.filename);
        const fileName = new Date().toLocaleDateString();

        /** @type {string} */
        this.filePath = path.join(root, 'logs', `${fileName}.txt`);

        /** @type {boolean} */
        this.fileIsBuzy = false;

        /** @type {MessageBlock[]} */
        this.blocks = [];

        this.write = this.write.bind(this);
    }

    write() {
        this.checkFile(error => {
            if (error && fs.existsSync(this.filePath)) {
                setTimeout(() => {
                    this.write();
                }, FileWriter.WRITE_ATTEMPT_TIMEOUT);
                return;
            }

            if (this.fileIsBuzy) {
                setTimeout(() => {
                    this.write();
                }, FileWriter.WRITE_ATTEMPT_TIMEOUT);
                return;
            }

            if (!this.blocks.length) {
                return;
            }

            this.fileIsBuzy = true;

            const completedBlocks = this.blocks.filter(messageBlock => messageBlock.isCompleted);
            this.writeBlocks(completedBlocks);
        });
    }

    /**
     * Asynchronously check is the file available for writing
     * @param {function} callback
     */
    checkFile(callback) {
        fs.access(this.filePath, fs.constants.W_OK, callback);
    }

    /**
     * Append a block message to file
     * @param {MessageBlock[]} messageBlocks
     * @param {number} blockIndex
     * @param {number} messageIndex
     * @throws error if something went wrong
     */
    writeBlocks(messageBlocks, blockIndex = 0, messageIndex = 0) {
        if (!messageBlocks.length) {
            return;
        }

        if (blockIndex >= messageBlocks.length) {
            this.blocks = this.blocks.filter(messageBlock => !messageBlock.isFinished);
            this.fileIsBuzy = false;
            return;
        }

        const currentBlock = messageBlocks[blockIndex];
        if (messageIndex >= currentBlock.lines.length) {
            currentBlock.finish();
            this.writeBreakLine(currentBlock, () => {
                this.writeBlocks(messageBlocks, blockIndex + 1, 0);
            });
            return;
        }

        const currentText = currentBlock.lines[messageIndex];
        const writeLine = this.writeLine.bind(this, currentBlock, currentText);
        const callNextIteration = this.writeBlocks.bind(
            this,
            messageBlocks,
            blockIndex,
            messageIndex + 1
        );

        if (messageIndex === 0) {
            const writeMessageDateTime = this.writeLine.bind(
                this,
                currentBlock,
                new Date().toISOString()
            );

            writeMessageDateTime(() => {
                writeLine(() => {
                    callNextIteration();
                });
            });
        }
        else {
            writeLine(() => {
                callNextIteration();
            });
        }
    }

    /**
     * Append a block message to file
     * @param {MessageBlock} currentBlock
     * @param {function} callback
     * @throws error if something went wrong
     */
    writeBreakLine(currentBlock, callback) {
        fs.appendFile(this.filePath, '\n', error => {
            if (error) {
                currentBlock.fail();
                throw new Error();
            }

            callback();
        });
    }

    /**
     * Append a block message to file
     * @param {MessageBlock} currentBlock
     * @param {string} line
     * @param {function} callback
     * @throws error if something went wrong
     */
    writeLine(currentBlock, line, callback) {
        fs.appendFile(this.filePath, `${line} \n`, error => {
            if (error) {
                currentBlock.fail();
                throw new Error();
            }

            callback();
        });
    }
}

export { FileWriter };
