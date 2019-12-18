import * as fs from "fs";
import * as readline from "readline";
import { Lexer } from "./pipeline/lexer/lexer"
import { TokenType, Token } from "./pipeline/tokens";

let tree = {}
let tokens: Token[] = []

const commentRegex = /^([^#]*)/

let sourceWithComments: string
let source = "";


let currLine: string

const reader = readline.createInterface({
    input: fs.createReadStream(process.argv[2])
})

reader.on("line", (line) => {
    let matches = commentRegex.exec(line)
    if (matches !== null) {
        if (matches[0] !== "") {
            source += matches[1].trim() + "\n"
        }   
    }
})

reader.on("close", () => {
    let lexer = new Lexer(source)
    let token: Token
    do {
        token = lexer.nextToken()
        tokens.push(token)
        console.log(TokenType[token.type] + " " + (token.value ? token.value : ""))
    } while (token.type !== TokenType.eof)
    console.dir(tokens)
})
