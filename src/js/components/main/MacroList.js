import React from 'react'

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
class MacroList extends React.Component {
    render() {
        return (
            <div id='macro-list'>
                <h3>System Macro List:</h3>
                <div id='macro-list-container'>
                {/* {this.props.macroFolders[0].macros.map((macro,index) => (
                    <MacroButton
                        key={index}
                        macro={macro}
                        selectedMacro={this.props.selectedMacro}
                    />
                ))} */}
                </div>
            </div>
        )
    }
}
export default MacroList