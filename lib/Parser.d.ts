import { StreamMethods } from "./InputStream";
declare function parse(input: StreamMethods<{
    type: string;
    value: string;
}>): {
    type: string;
    body: any[];
};
export { parse };
