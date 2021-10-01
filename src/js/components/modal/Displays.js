import React from 'react'

import '../../../style/components/modal/displays.scss'

class Display extends React.Component {

    handleDisplayPower = (displayIndex,command) => {
        this.props.sendDisplayCommand(displayIndex,command)
        this.props.setHeaderTimeout('set')
    }
    render() {
        return (
            <div className='display'>
                <h3>{this.props.label}</h3>
                <div className='display-controls'>
                    {this.props.displayStatus.power === 'power on' ?
                        <React.Fragment>
                            <button className='display-power-button-active-on' onClick={()=> {this.handleDisplayPower(this.props.index,this.props.display.setPower('Power On'))}}>Power On</button>
                            <button className='display-power-button-inactive' onClick={()=> this.handleDisplayPower(this.props.index,this.props.display.setPower('Power Off'))}>Power Off</button>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            {this.props.displayStatus.power === 'power off' ?
                                <React.Fragment>
                                    <button className='display-power-button-inactive' onClick={()=> this.handleDisplayPower(this.props.index,this.props.display.setPower('Power On'))}>Power On</button>
                                    <button className='display-power-button-active-off' onClick={()=> this.handleDisplayPower(this.props.index,this.props.display.setPower('Power Off'))}>Power Off</button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <button className='display-power-button-inactive' onClick={()=> this.handleDisplayPower(this.props.index,this.props.display.setPower('Power On'))}>Power On</button>
                                    <button className='display-power-button-inactive' onClick={()=> this.handleDisplayPower(this.props.index,this.props.display.setPower('Power Off'))}>Power Off</button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}
class Displays extends React.Component {
    state = {
        labels: ['Left Display','Center Left Display','Center Right Display','Right Display']
    }
    render() {
        return (
            <div id='displays'>
                <div id='displays-header'>Display Controls</div>
                <div id='display-list'>
                    {this.state.labels.map((label,index) => (
                        <Display
                            // states
                            key={index}
                            index={index}
                            label={label}
                            display={this.props.displays[index]}
                            displayStatus={this.props.displayStatus[index]}
                            // methods
                            sendDisplayCommand={this.props.sendDisplayCommand}
                            setHeaderTimeout={this.props.setHeaderTimeout}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
export default Displays