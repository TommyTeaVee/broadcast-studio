export let triggerMacro = (address,name) => {
    return (
        fetch(`http://${address}/v1/trigger?name=${name}`)
        .then(res => {
            console.log('res = ',res)
        })
    )
}
export let shortcut = (address,name) => {
    return (
        fetch(`http://${address}/v1/shortcut?name=${name}`)
        .then(res => {
            console.log('res = ',res)
        })
    )
}
export let querySession = address => {
    return (
        fetch(`http://${address}/v1/live`)
        .then(res => {
            if(!res.ok) {
                throw Error(res.statusText)
            }
            return res.text()
        })
        .catch(err => console.log('err => ',err))
    )
}
export let getMacroList = address => {
    class Macro {
        constructor(name,id) {
            this.name = name
            this.id = id
        }
    }
    class MacroFolder {
        constructor(name,macros) {
            this.name = name
            this.macros = macros
        }
    }
    return (
        fetch(`http://${address}/v1/dictionary?key=macros_list`)
        .then(res => {
            if(!res.ok) {
                throw Error(res.statusText)
            }
            return res.text()
        })
        .then(resText => {
            let macroString = resText.replace('<macros>','')
            macroString = macroString.replace('</macros>')
            let folders = []
            while(macroString.search('folder') > -1) {
                let folder = macroString.slice(0,macroString.search('folder>')+'folder>'.length)
                folder = folder.toString()
                macroString = macroString.replace(folder)
                folders.push(folder)
            }
            let macroFolders = []
            for(let folder of folders) {
                let folderName = folder.slice(folder.search('name="'),folder.search('" ')).replace('name="','')
                folder = folder.replace(folder.slice(0,folder.search('>')+1),'')
                let macros = folder.split('</macro>')
                let folderMacros = []
                for(let macro of macros) {
                    let name = macro.slice(macro.search('name="'),macro.search('" ')).replace('name="','')
                    let macroMinusName = macro.replace(`"${name}"`,'')
                    let id = macroMinusName.slice(macroMinusName.search('identifier="'),macroMinusName.search('" ')).replace('identifier="','')
                    if(id.search('>') > -1) {
                        id = id.slice(0,id.search('"')).replace('"','')
                    }
                    folderMacros.push(new Macro(name,id))

                }
                macroFolders.push(new MacroFolder(folderName,folderMacros))
            }
            return macroFolders
        })
    )
}




