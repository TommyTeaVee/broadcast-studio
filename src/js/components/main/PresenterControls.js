import React from 'react'
import { querySession,getMacroList } from '../../../../api/NewTekTricasterApi'
 
class PresenterModeButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.switcherStatus.input === this.props.input ?
                    <button className='presenter-mode-button-active' onClick={()=> this.props.sendSwitcherCommand(this.props.switcher.setInputSelection(this.props.input))}>{this.props.label}</button>
                :
                    <button className='presenter-mode-button-inactive' onClick={()=> this.props.sendSwitcherCommand(this.props.switcher.setInputSelection(this.props.input))}>{this.props.label}</button>
                }                
            </React.Fragment>
        )
    }
}
class SplashPageButton extends React.Component {
    render() {
        return (
            <button className='presenter-mode-button-inactive'>Splash Page</button>
        )
    }
}
class PresenterControls extends React.Component {
    render() {
        return (
            <div id='presenter-controls'>
                <SplashPageButton/>
                <PresenterModeButton
                    // states
                    label='Local Presenter'
                    input={1}
                    switcher={this.props.switcher}
                    switcherStatus={this.props.switcherStatus}
                    // methods
                    sendSwitcherCommand={this.props.sendSwitcherCommand}
                />
                <PresenterModeButton
                    // states
                    label='Remote Presenter'
                    input={2}
                    switcher={this.props.switcher}
                    switcherStatus={this.props.switcherStatus}
                    // methods
                    sendSwitcherCommand={this.props.sendSwitcherCommand}
                />
            </div>
        )
    }
}
export default PresenterControls