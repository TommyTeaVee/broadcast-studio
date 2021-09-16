import React from 'react'

class MacroButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedMacro === this.props.macro ? 
                    <button className='macro-button-active'>{this.props.macro}</button>
                :
                    <button className='macro-button-inactive'>{this.props.macro}</button>
                }
            </React.Fragment>
        )
    }
}
class MacroList extends React.Component {
    state = {
        macros: [
            'CONTENT + PRESENTER',
            'CONTENT + HUB CAMERA',
            'CONTENT FULL',
            'PRESENTER CAMERA FULL',
            'AUDIENCE CAMERA FULL',
            'DISCUSSION MODE',
            'ANOTHER MACRO',
            'YET ANOTHER MACRO'
        ],
        selectedMacro: 'CONTENT FULL'
    }
    render() {
        return (
            <div id='macro-list'>
                <h3>System Macro List:</h3>
                <div id='macro-list-container'>
                {this.state.macros.map((macro,index) => (
                    <MacroButton
                        key={index}
                        macro={macro}
                        selectedMacro={this.state.selectedMacro}
                    />
                ))}
                </div>
            </div>
        )
    }
}
export default MacroList