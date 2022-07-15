import { InputStream } from "./src/InputStream";
import { TokenStream } from "./src/TokenStream";
import { parse } from "./src/Parser";
import { Environment, evaluate } from "./src/Environment";

const code = `$if[$random>5] $print[Random is above$num[5]] $end $print[Random was;$random]`
const input_stream = InputStream(code);
const token_stream = TokenStream(input_stream);
let ast = parse(token_stream)
const globalEnv = new Environment();
const math = {random: 1, randomOffset: 10};
Object.defineProperty(math, "random", {
    get: () => Math.random() * math.randomOffset
});
globalEnv.def("random", math.random)
globalEnv.def("num", function(txt: string) {
    return Number(txt);
});

console.time("Run")
evaluate(ast, globalEnv)
console.timeEnd("Run")