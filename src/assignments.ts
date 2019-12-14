import { Variable } from "./pipeline/types/languageTypes"
import { MinecraftType } from "./pipeline/types/minecraftTypes"

function assignLiteral(variable: Variable, value: MinecraftType, exported?: boolean): string {
    let arg: MinecraftType | null = null
    switch (typeof value) {
        case "string":
            arg = `"${value}"`
            break
        default:
            arg = value
            break
    }
    if (exported) {
        
    }
    return `data modify storage ${variable.namespace}:${variable.target} ${variable.varName} set value ${arg}`
}

function assignVar(target_var: Variable, source_var: Variable, target_exported?: boolean, source_exported?: boolean) {
    return `data modify storage ${target_var.namespace}:${target_var.target} ${target_var.varName} set from storage ${source_var.namespace}:${source_var.target} ${source_var.varName}`
}

//data modify storage example:__global my_export set value 10