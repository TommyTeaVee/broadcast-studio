import React from 'react'
import DeviceStatus from '../components/booting/DeviceStatus'

class Booting extends React.Component {
    render() {
        return (
            <div id='booting'>
                System Booting
                <DeviceStatus
                    // states
                    switcherClientStatus={this.props.switcherClientStatus}
                    switcherAddress={this.props.switcherAddress}
                    displayClientStatus={this.props.displayClientStatus}
                    displayAddresses={this.props.displayAddresses}
                />
            </div>
        )
    }
}
export default Booting