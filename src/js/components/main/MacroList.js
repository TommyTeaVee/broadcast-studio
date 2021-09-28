import React from 'react'

import {shortcut} from '../../../../api/NewTekTricasterApi'

class MacroButtonHeader extends React.Component {

    render() {
        return (
            <div className='macro-list-header'>
                <h3>{this.props.selectedMacroFolderName}</h3>
                <button onClick={()=> {
                    this.props.setMainState('selectedMacroFolder',null)
                    this.props.setMainState('selectedMacroFolderName',null)
                }}>Return</button>
            </div>
        )
    }
}
class MacroButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.macro.name === this.props.selectedMacroName ? 
                    <button className='macro-button-active' onClick={()=> this.props.setMacro(this.props.macro)}>{this.props.macro.name}</button>
                :
                    <button className='macro-button-inactive' onClick={()=> this.props.setMacro(this.props.macro)}>{this.props.macro.name}</button>
                }
            </React.Fragment>
        )
    }
}
class MacroFolderHeader extends React.Component {
    render() {
        return (
            <div className='macro-list-header'>
                <h3>Select Macro Folder Below</h3>
            </div>
        )
    }
}
class MacroFolderButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedMacroFolderName === this.props.macroFolder.name ?
                    <button className='macro-button-active' onClick={()=> this.props.setSelectedMacroFolder(this.props.macroFolder)}>{this.props.macroFolder.name}</button>
                :
                    <button className='macro-button-inactive' onClick={()=> this.props.setSelectedMacroFolder(this.props.macroFolder)}>{this.props.macroFolder.name}</button>           
                }
            </React.Fragment>
        )
    }
}
class MacroList extends React.Component {
    setMacro = macro => {
        shortcut(this.props.tricasterAddress,'play_macro_byname',macro.name)
        .then(res => {
            console.log('res = ',res)
            if(res.search('Shortcut executed.') > -1) {
                this.props.setMainState('selectedMacro',macro)
                this.props.setMainState('selectedMacroName',macro.name)
            }
        })
    }
    render() {
        return (
            <div id='macro-list'>
                <div id='macro-list-container'>
                    {this.props.selectedMacroFolder === null ?
                        <React.Fragment>
                            {/* <MacroFolderHeader/> */}
                            {this.props.macroFolders.map((macroFolder,index) => (
                                <MacroFolderButton
                                    // states
                                    key={index}
                                    macroFolder={macroFolder}
                                    selectedMacroFolder={this.props.selectedMacroFolder}
                                    selectedMacroFolderName={this.props.selectedMacroFolderName}
                                    // methods
                                    setSelectedMacroFolder={this.props.setSelectedMacroFolder}
                                />
                            ))}
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <MacroButtonHeader
                                // states
                                selectedMacroFolderName={this.props.selectedMacroFolderName}
                                // methods
                                setMainState={this.props.setMainState}
                            />
                            {this.props.selectedMacroFolder.macros.map((macro,index) => (
                                <MacroButton
                                    // states
                                    key={index}
                                    macro={macro}
                                    selectedMacro={this.props.selectedMacro}
                                    selectedMacroName={this.props.selectedMacroName}
                                    tricasterAddress={this.props.tricasterAddress}
                                    // methods
                                    setMacro={this.setMacro}
                                />
                            ))}
                        </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}
export default MacroList