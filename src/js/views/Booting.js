import React from 'react'

import BootingHeader from '../components/booting/BootingHeader'
import BootingFooter from  '../components/booting/BootingFooter'
import DeviceStatus from '../components/booting/DeviceStatus'

import '../../style/views/booting.scss'

class BootingTitle extends React.Component {
    render() {
        return (
            <div id='booting-title'>
                <h1>Steelcase Broadcast Studio</h1>
            </div>
        )
    }
}
class Booting extends React.Component {
    render() {
        return (
            <div id='booting'>
                <BootingHeader/>
                <div id='booting-content'>
                    <BootingTitle/>
                    <DeviceStatus
                        // states
                        switcherClientStatus={this.props.switcherClientStatus}
                        switcherAddress={this.props.switcherAddress}
                        displayClientStatus={this.props.displayClientStatus}
                        displayAddresses={this.props.displayAddresses}
                        tricasterCommStatus={this.props.tricasterCommStatus}
                        tricasterAddress={this.props.tricasterAddress}
                    />
                </div>
                <BootingFooter/>
            </div>
        )
    }
}
export default Booting