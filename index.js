// function log_mem() {
//     let mem = process.memoryUsage();
//     console.log("RSS:", Number((mem.rss/1024/1024).toFixed(2)), "MB\n Heap:", Number((mem.heapUsed/1024/1024).toFixed(2)), "/", Number((mem.heapTotal/1024/1024).toFixed(2)), "MB\n External:", Number((mem.external/1024/1024).toFixed(2)), "MB, Array Buffer:", Number((mem.arrayBuffers/1024/1024).toFixed(2)), "MB");
// }

const token = require("./lib/TokenStream");
const input = require('./lib/InputStream');
const parser = require("./lib/Parser");
const env = require("./lib/Environment");
const { inspect } = require("util");

// console.log("Preparing input");
// log_mem();
// console.log("Running input")
// while (!token_stream.eof()) {
//     console.log(token_stream.next());
// }
// console.log(inspect(parser.parse(token_stream).body, false, null, true))
const code = `$if[$random>5] $print[Random is above$num[5]] $end $print[Random was;$random]`
const input_stream = input.InputStream(code);
const token_stream = token.TokenStream(input_stream);
let ast = parser.parse(token_stream);
let globalEnv = new env.Environment();
const math = {random: 1, randomOffset: 10};
Object.defineProperty(math, "random", {
    get: () => Math.random() * math.randomOffset
});
globalEnv.def("random", math.random)
globalEnv.def("num", function(txt) {
    return Number(txt);
});
console.time("Run")
env.evaluate(ast, globalEnv)
console.timeEnd("Run")
// log_mem();
// console.log("Finished run")