const Package = require("./dist/index");
const Visitor = Package.Visitor
const Modules = Package.Modules
const { VariableDeclType } = Package.Enums;
const fs = require("fs");
const body = [
    // Declaring a Variable
    new Modules.VariableDecl(
        // Name of Variable
        "os", 
        // 3 Types, Constant = const, Default = var, Scope = let
        VariableDeclType.Constant, 
        // Value of variable
        // CallExp is an expression to call a function
        new Modules.CallExp(
            // Name of function
            "require", 
            // Parameters of function
            "os"
            )
    ),
    Modules.EOF,
    // Using a variable
    new Modules.Variable("console"), 
    // Use of dot notation
    Modules.Dot, 
    // Calling "log" function from variable "console"
    new Modules.CallExp("log",
    new Modules.Literal("TMPDIR >>"),
    [
        new Modules.Variable("os"), Modules.Dot, new Modules.CallExp("tmpdir")
    ]),

    // Using If Statements
    Modules.EOF,
    new Modules.VariableDecl("chance", VariableDeclType.Constant, new Modules.Operation([
        new Modules.Variable("Math"),
        Modules.Dot,
        new Modules.CallExp("random")
    ])),
    Modules.EOF,
    new Modules.IfStmt([
        new Modules.Condition(new Modules.Variable("chance"), 0.7, Package.Enums.ConditionOperationType.Big),
        new Modules.Variable("console"),
        Modules.Dot,
        new Modules.CallExp("log", "Above 0.7")
    ]),
    new Modules.ElseIfStmt([
        new Modules.Condition(new Modules.Variable("chance"), 0.4, Package.Enums.ConditionOperationType.Low),
        new Modules.Variable("console"),
        Modules.Dot,
        new Modules.CallExp("log", "Below 0.4")
    ]),
    new Modules.ElseStmt([
        new Modules.Variable("console"),
        Modules.Dot,
        new Modules.CallExp("log", "Above 0.4 and Below 0.7")
    ])
];

const visitor = new Visitor();
fs.writeFileSync("./test.js", body.map((v) => v.accept(visitor)).join(""));