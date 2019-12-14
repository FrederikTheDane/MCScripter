export class Token {
    type: TokenType
    value: string | undefined

    constructor(t: TokenType, val?: string) {
        this.value = val
        this.type = t
    }
}

export enum TokenType {
    keyword,
    identifier,
    integer,
    float,
    string,
    selector,
    assign,
    escape_seq,
    divide,
    asterisk,
    equals,
    not_equals,
    g_than,
    ge_than,
    l_than,
    le_than,
    eof,

    //Unambiguous single char token types
    l_brace,
    r_brace,
    l_bracket,
    r_bracket,
    l_paren,
    r_paren,
    colon,
    statement_end,
    comment_begin,
    plus,
    minus,
}

export const Keywords: string[] = [
    "var",
    "namespace",
    "function",
    "do",
    
    //Reserved for future versions
    "export",
    "import", 
    "external",
    "while",
    "for",
    "loop",
    "return",
    "ref",
    "pointer",
    "int",
    "float",
    "string",
    "selector",
    "class",
    "struct",
    "package"
]

export const BuiltInIdentifiers: string[] = [
    "say",
    "tell",
    "me"
]