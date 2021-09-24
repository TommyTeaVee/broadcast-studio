import React from 'react'

class MacroButtonHeader extends React.Component {
    render() {
        return (
            <div className='macro-list-header'>
                <h3>{this.props.selectedMacroFolder.name}</h3>
                {this.props.showReturn ?
                    <button>Return</button>
                :
                    <React.Fragment/>
                }
            </div>
        )
    }
}
class MacroButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedMacro === this.props.macro.name ? 
                    <button className='macro-button-active'>{this.props.macro.name}</button>
                :
                    <button className='macro-button-inactive'>{this.props.macro.name}</button>
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
                            {/* <MacroButtonHeader/> */}
                            {this.props.selectedMacroFolder.macros.map((macro,index) => (
                                <MacroButton
                                    key={index}
                                    macro={macro}
                                    selectedMacro={this.props.selectedMacro}
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