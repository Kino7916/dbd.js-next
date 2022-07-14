const token = require("./lib/TokenStream");
const input = require('./lib/InputStream');
const code = "$open [file.js]$write[owo]$close[file.js]"
const code2 = "$c $c Leveling $let[exp] $if[$exp>=12] $print[Leveled up!] $else $end $export[$exp]"
const input_stream = input.InputStream(code2);
const token_stream = token.TokenStream(input_stream)

while (!token_stream.eof()) {
    console.log(token_stream.next());
}