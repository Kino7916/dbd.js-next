declare function InputStream(input: string): StreamMethods;
declare interface StreamMethods {
    next: () => string;
    fallback: (offset: number) => string;
    peek: (offset: number) => string;
    eof: () => boolean;
    croak: (msg: string) => void;
}
export { InputStream, StreamMethods };
