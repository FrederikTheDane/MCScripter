import { MinecraftJsonText } from "./pipeline/types/minecraftTypes"
import { Variable } from "./pipeline/types/languageTypes"

function operatorStringConcat(...args: (MinecraftJsonText | string)[]): MinecraftJsonText[] {
    let arr: MinecraftJsonText[] = []

    for(let i = 0; i < args.length; i++) {
        if(typeof args[i] == "string") {
            arr.push({text: args[i] as string})
        } else {
            arr.push(args[i] as MinecraftJsonText)
        }
    }

    return arr
}
