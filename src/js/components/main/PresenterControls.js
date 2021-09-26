import React from 'react'
import { querySession,getMacroList } from '../../../../api/NewTekTricasterApi'

import Loader from '../shared/Loader'
 
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
                
                {/* {this.props.displayStatus.map((displayStatus,index) => (
                    <React.Fragment>
                        {displayStatus.power === 'power on' ?
                            <button key={index} onClick={()=> this.props.sendDisplayCommand(index,this.props.displays[index].setPower('power off'))}>{`Display ${index + 1} Power On`}</button>
                        :
                            <button key={index} onClick={()=> this.props.sendDisplayCommand(index,this.props.displays[index].setPower('power on'))}>{`Display ${index + 1} Power Off`}</button>
                        }
                    </React.Fragment> 
                ))} */}
            </div>
        )
    }
}
export default PresenterControls