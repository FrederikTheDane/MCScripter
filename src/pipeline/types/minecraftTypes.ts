import { ReservedSymbols, Operators } from "../reserved"
import { Literal } from "./languageTypes"

export interface MinecraftJsonText {
    text?: string
    nbt?: string
    storage?: string
    bold?: boolean
    italic?: boolean
    underlined?: boolean
    strikethrough?: boolean
    obfuscated?: boolean
}

//Convert 
export class MinecraftObject {
    [key: string]: MinecraftType

    constructor(obj: string) {
        let fields = obj.split(ReservedSymbols.next_item)
        for(let i = 0; i < fields.length; i++) {
            let pair = fields[i].split(Operators.assign_property)
            if (pair.length != 2) {
                throw "Malformed object"
            } else {
                this[pair[0]] = pair[1]
            }
        }
    }
}


export type MinecraftType = string | number | MinecraftJsonText | boolean | MinecraftObject
export type MinecraftTypeString = "string" | "integer" | "float" | "MinecraftJsonText" | "boolean" | "MinecraftObject"