export const ValueTypes = {
    variable: "var",
    integer: "int",
    text: "string",
    float: "float",
    object: "object",
}

export const Operators = {
    add: "+",
    concat: "+",
    subtract: "-",
    assign: "=",
    multiply: "*",
    divide: "/",
    assign_property: ":"
}

export const ReservedSymbols = {
    namespace: "namespace",
    comment: "#",
    call_function: "do",
    raw_command: "/",
    function_define_prefix: "function",
    statement_suffix: ";",
    namespace_scope_seperator: ":",
    scope_start: "{",
    scope_end: "}",
    next_item: ","
}

export const Tokens = [
    ...Object.values(ValueTypes),
    ...Object.values(ReservedSymbols),
    ...Object.values(Operators)
]