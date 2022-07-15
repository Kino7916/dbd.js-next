"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenStream = void 0;
function TokenStream(input) {
    let current = null;
    let keywords = " $if $then $elseif $else $end $and $or $c";
    let is_start = false;
    return {
        next,
        fallback: null,
        peek,
        eof,
        croak: input.croak
    };
    function is_keyword(x) {
        return keywords.indexOf(` ${x} `) >= 0;
    }
    function is_digit(ch) {
        return /[0-9]/i.test(ch);
    }
    function is_id_start(ch) {
        return "$" === ch;
    }
    function is_id(ch) {
        return is_id_start(ch);
    }
    function is_op_char(ch) {
        return "+-*/%=&|<>!".indexOf(ch) >= 0;
    }
    function is_punc(ch) {
        return ";[]".indexOf(ch) >= 0;
    }
    function is_whitespace(ch) {
        return " \t\n".indexOf(ch) >= 0;
    }
    function is_not_literal(ch) {
        return is_punc(ch) || ch === "$";
    }
    function read_comment() {
        let c = read_while(function (ch) {
            if (ch === "$") {
                let token = read_ident();
                if (token.type === "kw" && token.value === "$end") {
                    return false;
                }
                input.fallback(token.value.length);
                return true;
            }
            return true;
        });
        return { type: "comment", value: c };
    }
    function read_while(predicate) {
        let str = "";
        while (!input.eof() && predicate(input.peek(0)))
            str += input.next();
        return str;
    }
    function read_string() {
        let escaped = false, str = "";
        while (!input.eof()) {
            let ch = input.next();
            if (escaped) {
                str += is_not_literal(ch) ? ch : "\\" + ch;
                escaped = false;
            }
            else if (ch === "\\")
                escaped = true;
            // else if (is_not_literal(input.peek(1))) break
            else if (is_not_literal(ch)) {
                input.fallback(1);
                break;
            }
            else {
                str += ch;
            }
        }
        return { type: "str", value: str };
    }
    function read_ident() {
        let fn = input.next() + read_while(function (ch) { return /[\w-_]/i.test(ch); });
        return {
            type: is_keyword(fn) ? "kw" : "var",
            value: fn
        };
    }
    function handle_kw_ident(token) {
        if (token.type !== "kw")
            return token;
        if (token.value === "$c")
            return read_comment();
        return token;
    }
    function read_next() {
        if (input.eof())
            return null;
        let ch = input.peek(0);
        if (is_id_start(ch))
            return handle_kw_ident(read_ident());
        if (is_punc(ch))
            return {
                type: "punc",
                value: input.next()
            };
        if (is_op_char(ch))
            return {
                type: "op",
                value: read_while(is_op_char)
            };
        return read_string();
    }
    function next() {
        let token = current;
        current = null;
        return token || peek();
    }
    function peek() {
        return current || (current = read_next());
    }
    function eof() {
        return peek() == null;
    }
}
exports.TokenStream = TokenStream;
