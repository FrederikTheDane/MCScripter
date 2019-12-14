import { MinecraftJsonText, MinecraftType } from "./minecraftTypes"

interface ToJsonText {
    toJsonText() : MinecraftJsonText
}

export class Variable implements ToJsonText {
    namespace: string
    target: string
    varName: string
    value: MinecraftType
    exported: boolean

    constructor(namespace: string, target: string, varName: string, value: MinecraftType, exported: boolean) {
        this.namespace = namespace
        this.target = target
        this.varName = varName
        this.value = value
        this.exported = exported
    }

    toJsonText(): MinecraftJsonText {
        return { 
            nbt: `${this.varName}`,
            storage: `${this.namespace}:${this.target}`
        }
    }
}

export class Literal implements ToJsonText{
    value: MinecraftType

    constructor(value: any) {
        this.value = value
    }

    toJsonText(): MinecraftJsonText {
        return {
            //If string, add quotation marks, else don't
            text: typeof this.value == "string" ? `${this.value}` : String(this.value)
        }
    }
}

