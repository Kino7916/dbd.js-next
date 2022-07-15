import { StreamMethods } from "./InputStream";

var FALSE = { type: "boolean", value: false };
var PRECEDENCE = {
    "=": 1,
    "||": 2,
    "&&": 3,
    "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
    "+": 10, "-": 10,
    "*": 20, "/": 20, "%": 20,
};

function parse(input: StreamMethods<{type: string, value: string}>) {
    return parse_toplevel();
    function is_punc(ch?: string) {
        let tok = input.peek();
        return tok && tok.type == "punc" && (!ch || tok.value == ch) && tok;
    }
    function is_kw(ch?: string) {
        let tok = input.peek();
        return tok && tok.type == "kw" && (!ch || tok.value == ch) && tok;
    }
    function skip_punc(ch: string) {
        if (is_punc(ch)) input.next();
        else input.croak("Expecting punctuation: \"" + ch + "\"");
    }
    function skip_kw(kw: string) {
        if (is_kw(kw)) input.next();
        else input.croak("Expecting keyword: \"" + kw + "\"");
    }
    function unexpected(token?) {
        token = token || input.peek();
        input.croak(`Unexpected token ${token?.type === "kw" ? "of keyword" : ""}: ${token?.value}`);
    }
    function is_op(op?) {
        var tok = input.peek();
        return tok && tok.type == "op" && (!op || tok.value == op) && tok;
    }
    function maybe_binary(left, my_prec) {
        let token = is_op();
        if (token) {
            let his_prec = PRECEDENCE[token.value];
            if (his_prec > my_prec) {
                input.next();
                return maybe_binary({
                    type     : token.value == "=" ? "assign" : "binary",
                    operator : token.value,
                    left     : left,
                    right    : maybe_binary(parse_atom(), his_prec)
                }, my_prec);
            }
        }
        return left;
    }
    function delimited(start: string, stop: string, separator: string, parser: Function, skip: (ch: string) => void = skip_punc, check: (ch: string) => {type:string,value:string} = is_punc) {
        let a = [], first = true;
        if (start) skip(start);
        while (!input.eof()) {
            if (check(stop)) break;
            if (first) first = false; else separator ? check(separator) ? skip(separator) : null : null;
            if (check(stop)) break;
            a.push(parser());
        }
        skip(stop);
        return a;
    }
    function parse_call(func: any /**AST */) {
        return {
            type: "call",
            func,
            args: delimited("[", "]", ";", parse_expression),
        };
    }
    function parse_varname() {
        let name = input.next();
        if (name.type != "var") input.croak("Expecting variable name");
        return name.value;
    }
    function parse_if() {
        skip_kw("$if");
        let args = delimited("[", "]", ";", parse_expression);
        if (args.length === 0) throw new Error(`Expected condition in if`)
        let then = args[1] || parse_prog(is_kw("$then") ? "$then" : null);
        let ret = {
            type: "if",
            cond: args[0],
            then: then,
            else: null
        };
        if (is_kw("$else")) {
            input.next();
            ret.else = args[2] || is_kw("$then") ? parse_prog() : parse_expression();
        }
        return ret;
    }
    function parse_bool() {
        return {
            type  : "bool",
            value : input.next().value == "true" || input.peek(0).value === "yes"
        };
    }
    function maybe_call(expr: () => any/**AST */) {
        expr = expr();
        return is_punc("[") ? parse_call(expr) : expr;
    }
    function parse_atom() {
        return maybe_call(function(){
            if (is_punc("[")) {
                input.next();
                let exp = parse_expression();
                skip_punc("]");
                return exp;
            }
            if (is_kw("$if")) return parse_if();
            if (is_kw("$then")) return parse_prog();
            let token = input.next();
            if (token.type == "var" || token.type == "num" || token.type == "str")
                return token;
            unexpected(token);
        });
    }
    function parse_toplevel() {
        let prog = [];
        while (!input.eof()) {
            prog.push(parse_expression());
        }
        return { type: "prog", body: prog}
    }
    function parse_prog(kw: string = "$then") {
        let prog = delimited(kw, "$end", "", parse_expression, skip_kw, is_kw);
        if (prog.length === 0) return FALSE;
        if (prog.length === 1) return prog[0];
        return { type: "prog", body: prog };
    }
    function parse_expression() {
        return maybe_call(function(){
            return maybe_binary(parse_atom(), 0);
        });
    }
}

export {
    parse
}