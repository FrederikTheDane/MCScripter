import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import * as stream from "stream"
import { ReservedSymbols } from "./pipeline/reserved";

let tree = {}

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
    
})
