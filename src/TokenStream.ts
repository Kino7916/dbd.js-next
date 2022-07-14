import { StreamMethods } from "./InputStream";

function TokenStream(input: StreamMethods): StreamMethods {
    let current = null;
    let keywords = " $if $then $elseif $else $end $and $or $c $export";
    let is_start = false;
    return {
        next,
        fallback: null,
        peek,
        eof,
        croak: input.croak
    }
    function is_keyword(x: string) {
        return keywords.indexOf(` ${x} `) >= 0;
    }
    function is_digit(ch: string) {
        return /[0-9]/i.test(ch);
    }
    function is_id_start(ch: string) {
        return "$" === ch;
    }
    function is_id(ch: string) {
        return is_id_start(ch);
    }
    function is_op_char(ch: string) {
        return "+-*/%=&|<>!".indexOf(ch) >= 0;
    }
    function is_punc(ch: string) {
        return ";[]".indexOf(ch) >= 0;
    }
    function is_whitespace(ch: string) {
        return " \t\n".indexOf(ch) >= 0;
    }
    function is_not_literal(ch: string) {
        return is_punc(ch) || ch === "$";
    }
    function read_comment() {
        let c = read_while(function(ch) { 
            if (ch === "$") {
                let token = read_ident();
                if (token.type === "kw" && token.value === "$end") {
                    return false;
                }
                input.fallback(token.value.length)
                return true;
            }
            return true;
        });
        return {type: "comment", value: c}
    }
    function read_while(predicate: (ch: string) => boolean) {
        let str = "";
        while (!input.eof() && predicate(input.peek(0)))
            str += input.next();
        return str;
    }
    function read_string() {
        let escaped = false, str = "";
        while(!input.eof()) {
            let ch = input.next();
            if (escaped) {
                str += is_not_literal(ch) ? ch : "\\" + ch;
                escaped = false;
            } else if (ch === "\\") escaped = true
            // else if (is_not_literal(input.peek(1))) break
            else if (is_not_literal(ch)) {input.fallback(0); break}
            else {
                str += ch;
            }
        }
        return { type: "string", value: str };
    }
    function read_ident() {
        let fn = input.next() + read_while(function (ch) { return /[\w-_]/i.test(ch); });
        return {
            type: is_keyword(fn) ? "kw" : "var",
            value: fn
        }
    }
    function handle_kw_ident(token: {type: string, value: string}) {
        if (token.type !== "kw") return token;
        if (token.value === "$c") return read_comment();
        return token;
    }
    function read_next() {
        if (!is_start) read_while(is_whitespace), is_start = true;
        if (input.eof()) return null;
        let ch = input.peek(0);
        if (is_id_start(ch)) return handle_kw_ident(read_ident());
        if (is_punc(ch)) return {
            type: "punc",
            value: input.next()
        }
        return read_string();
    }
    function next() {
        let token = current;
        current = null;
        return token || read_next()
    }
    function peek() {
        return current || (current = read_next());
    }
    function eof() {
        return peek() == null;
    }
}

export {
    TokenStream
}