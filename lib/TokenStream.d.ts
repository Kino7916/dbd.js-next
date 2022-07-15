import { StreamMethods } from "./InputStream";
declare function TokenStream(input: StreamMethods<string>): StreamMethods<{
    type: string;
    value: string;
}>;
export { TokenStream };
