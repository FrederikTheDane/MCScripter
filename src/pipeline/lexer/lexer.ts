import { TokenType, Token, Keywords } from "../tokens"

export class Lexer {
    text: string
    pos: number
    char: string | null

    constructor(txt: string) {
        this.text = txt
        this.pos = 0
        this.char = this.text[this.pos]
    }

    err() {
        throw "Unexpected/invalid chatacter: " + this.char
    }

    advance() {
        ++this.pos
        this.char = this.text[this.pos]        
    }

    number() : Token {
        let result = ""
        let numType: TokenType.integer | TokenType.float = TokenType.integer

        while (!isNaN(Number(this.char)) || this.char == ".") {
            if (this.char == "." && numType == TokenType.integer) {
                numType = TokenType.float
            }
            result += this.char
            this.advance()    
        }

        if (!isNaN(Number(result))) {
            return new Token(numType, result)
        } else {
            throw `Invalid number ${result}`
        }
    }

    word() : Token {
        let result = ""
        let wordType: TokenType.keyword | TokenType.identifier = TokenType.identifier

        while ((/[a-z]/i).test(this.char!) || (/[0-9]/).test(this.char!) || this.char == "_") {
            result += this.char!
            this.advance()
        }
        if (Keywords.includes(result)) wordType = TokenType.keyword
        return new Token(wordType, result)        
    }

    nextToken() : Token {
        while (this.char !== "" && this.char !== null && this.char !== undefined) {
            if (this.char.trim() == "") {
                this.advance();
                continue
            }

            switch (this.char) {
                case "-":
                    this.advance()
                    return new Token(TokenType.minus)
                case "+":
                    this.advance()
                    return new Token(TokenType.plus)
                case "{":
                    this.advance()
                    return new Token(TokenType.l_brace)
                case "}":
                    this.advance()
                    return new Token(TokenType.r_brace)
                case ":":
                    this.advance()
                    return new Token(TokenType.colon)
                case ";":
                    this.advance()
                    return new Token(TokenType.statement_end)
                default:
                    break;
            }
            
            if ((/[a-z]/i).test(this.char) || this.char == "_") {
                return this.word()
            }

            if (Number(this.char) !== NaN) {
                return this.number()
            }

            throw `Invalid character: ${this.char}`
        }
        return new Token(TokenType.eof)
    }
}
