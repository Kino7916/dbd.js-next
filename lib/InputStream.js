"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputStream = void 0;
function InputStream(input) {
    let pos = 0, line = 1, col = 0;
    return {
        next,
        fallback,
        peek,
        eof,
        croak
    };
    function next() {
        let ch = input.charAt(pos++);
        if (ch === "\n")
            line++, col = 0;
        else
            col++;
        return ch;
    }
    function fallback(offset = 0) {
        let ch = input.charAt(pos -= offset);
        if (ch === "\n")
            line--;
        else
            col--;
        return ch;
    }
    function peek(offset = 0) {
        return input.charAt(pos + offset);
    }
    function eof() {
        return peek(0) === "";
    }
    function croak(msg) {
        throw new Error(msg);
    }
}
exports.InputStream = InputStream;
