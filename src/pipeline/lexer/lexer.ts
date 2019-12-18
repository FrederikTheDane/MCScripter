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

        while (this.char !== undefined && ((/[a-z]/).test(this.char!) || (/[0-9]/).test(this.char!) || this.char == "_")) {
            result += this.char!
            this.advance()
        }
        if (Keywords.includes(result)) wordType = TokenType.keyword
        return new Token(wordType, result)        
    }

    //Yields characters in a string until the end is reached
    //
    //Includes the opening and terminating quotation marks as well as any backslashes
    //because they are needed anyways in the minecraft commmands
    *stringGen() {
        //Character in the previous iteration
        let prevChar = ""
        while (true) {
            //If it's not the first character
            if (this.char == '"' && prevChar !== "") {
                //If its not escaped, return the charcter
                if (prevChar !== "\\") {
                    return this.char
                }
            }
            yield this.char
            this.advance()
        }
    }

    fullString() : string {
        let full = ""
        let generator = this.stringGen()
        let next
        do {
            next = generator.next()
            full += next.value
        } while (!next.done)

        return full
    }

    string() : Token {
        return new Token(TokenType.string, this.fullString())
    }

    selector() : Token {
        let result = ""
        while (this.char !== "]") {
            if (this.char == '"') {
                result += this.fullString()
            }
            this.advance()
            result += this.char
        }
        return new Token(TokenType.selector, result)
    }

    operator() : Token {
        let result = ""
        while (true) {
            this.advance()
            break;
        }
        return new Token(TokenType.equals)
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
            
            if ((/[a-z]/).test(this.char) || this.char == "_") {
                return this.word()
            }

            if (this.char == '"') {
                return this.string()
            }

            if (this.char == "@") {
                return this.selector()
            }

            if (!isNaN(Number(this.char))) {
                return this.number()
            }

            this.err()
        }
        return new Token(TokenType.eof)
    }
}
