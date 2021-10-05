import React from 'react'

import '../../../style/components/settings/devices.scss'

class DeviceHeader extends React.Component {
    render() {
        return (
            <div className='device-header' style={{marginTop: this.props.marginTop}}>
                <div className='device-header-controls'>
                    <button className='device-header-size-button device-header-size-plus' onClick={()=> this.props.setDeviceOpenState(this.props.device,true)}>+</button>
                    <button className='device-header-size-button device-header-size-minus' onClick={()=> this.props.setDeviceOpenState(this.props.device,false)}>-</button> 
                </div> 
                <h3>{this.props.name}</h3>
            </div>
        )
    }
}
class DeviceTricaster extends React.Component {
    render() {
        return  (
            <div className='device-open' id='device-tricaster'>
                Device Tricaster
            </div>
        )
    }
}
class DeviceSwitcher extends React.Component {
    render() {
        return (
            <div className='device-open' id='device-switcher'>
                Device Switcher
            </div>
        )
    }
}
class DeviceDisplays extends React.Component {
    render() {
        return (
            <div className='device-open' id='device-displays'>
                Device Displays
            </div>
        )
    }
}
class DeviceMagewell extends React.Component {
    render() {
        return (
            <div className='device-open' id='device-magwell'>
                Device Magewell
            </div>
        )
    }
}
class DeviceCameras extends React.Component {
    render() {
        return (
            <div className='device-open' id='device-cameras'>
                Device Cameras
            </div>
        )
    }
}
class Devices extends React.Component {
    state = {
        tricaster: {
            name: 'Tricaster',
            open: true,
        },
        switcher: {
            name: 'Video Switcher',
            open: false,
        },
        displays: {
            name: 'Displays',
            open: false,
        },
        magewell: {
            name: 'Magewell',
            open: false,
        },
        cameras: {
            name: 'Cameras',
            open: false,
        }
    }
    setDeviceOpenState = (device,state) => {
        let component = this.state[device]
        component.open = state
        this.setState({[device]: component})
    }
    render() {
        return (
            <div id='settings-devices'>
                <React.Fragment>
                    {/* TRICASTER *******************************************************************/}
                    <DeviceHeader
                        // states
                        name={this.state.tricaster.name}
                        device='tricaster'
                        marginTop='0'
                        // methods
                        setDeviceOpenState={this.setDeviceOpenState}
                    />
                    {this.state.tricaster.open ?
                        <DeviceTricaster/>
                    :
                        <React.Fragment/>
                    }
                    {/* SWITCHER ********************************************************************/}
                    <DeviceHeader
                        // states
                        name={this.state.switcher.name}
                        device='switcher'
                        marginTop='0.25%'
                        // methods
                        setDeviceOpenState={this.setDeviceOpenState}
                    />
                    {this.state.switcher.open ?
                        <DeviceSwitcher/>
                    :
                        <React.Fragment/>
                    }
                    {/* DISPLAYS ********************************************************************/}
                    <DeviceHeader
                        // states
                        name={this.state.displays.name}
                        device='displays'
                        marginTop='0.25%'
                        // methods
                        setDeviceOpenState={this.setDeviceOpenState}
                    />
                    {this.state.displays.open ?
                        <DeviceDisplays/>
                    :
                        <React.Fragment/>
                    }
                    {/* MAGEWELL ********************************************************************/}
                    <DeviceHeader
                        // states
                        name={this.state.magewell.name}
                        device='magewell'
                        marginTop='0.25%'
                        // methods
                        setDeviceOpenState={this.setDeviceOpenState}
                    />
                    {this.state.magewell.open ?
                        <DeviceMagewell/>
                    :
                        <React.Fragment/>
                    }
                    {/* CAMERAS *********************************************************************/}
                    <DeviceHeader
                        // states
                        name={this.state.cameras.name}
                        device='cameras'
                        marginTop='0.25%'
                        // methods
                        setDeviceOpenState={this.setDeviceOpenState}
                    />
                    {this.state.cameras.open ?
                        <DeviceCameras/>
                    :
                        <React.Fragment/>
                    }
                </React.Fragment>
            </div>
        )
    }
}
export default Devices