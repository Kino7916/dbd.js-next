declare function InputStream(input: string): StreamMethods<string>;
declare interface StreamMethods<T> {
    next: () => T;
    fallback: (offset: number) => T;
    peek: (offset?: number) => T;
    eof: () => boolean;
    croak: (msg: string) => void;
}
export { InputStream, StreamMethods };
