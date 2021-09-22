import React from 'react'


class DeviceConnection extends React.Component {
    render() {
        return (
            <div className='device-connection'> 
                
            </div>
        )
    }
}

class DeviceStatus extends React.Component {
    render() {
        return (
            <div id='device-status'>
                    <h3>{this.props.switcherClientStatus} to Extron SW-HD-4k-Plus @ {this.props.switcherAddress}</h3>
                    <h1>Display 1 Status: {this.props.displayClientStatus[0]}</h1>
                    <h1>Display 2 Status: {this.props.displayClientStatus[1]}</h1>
                    <h1>Display 3 Status: {this.props.displayClientStatus[2]}</h1>
                    <h1>Display 4 Status: {this.props.displayClientStatus[3]}</h1>
            </div>
        )
    }
}
export default DeviceStatus