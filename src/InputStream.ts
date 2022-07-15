function InputStream(input: string): StreamMethods<string> {
    let pos = 0, line = 1, col = 0;
    return {
        next,
        fallback,
        peek,
        eof,
        croak
    }
    function next() {
        let ch = input.charAt(pos++);
        if (ch === "\n") line++, col = 0; else col++;
        return ch;
    }
    function fallback(offset: number = 0) {
        let ch = input.charAt(pos-=offset);
        if (ch === "\n") line--; else col--;
        return ch;
    }
    function peek(offset: number = 0) {
        return input.charAt(pos + offset);
    }
    function eof() {
        return peek(0) === "";
    }
    function croak(msg: string) {
        throw new Error(msg);
    }
}

declare interface StreamMethods<T> {
    next: () => T;
    fallback: (offset: number) => T;
    peek: (offset?: number) => T;
    eof: () => boolean;
    croak: (msg: string) => void;
}

export {
    InputStream,
    StreamMethods
}