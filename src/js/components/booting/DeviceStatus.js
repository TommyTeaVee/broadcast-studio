import { ResolverFactory } from 'enhanced-resolve'
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
                    {this.props.switcherClientStatus === '' ? 
                        <React.Fragment/>
                    :
                        <h3>{this.props.switcherClientStatus} to Extron SW-HD-4k-Plus @ {this.props.switcherAddress}</h3>
                    }
                    {this.props.displayClientStatus.map((displayClientStatus,index) => (
                        <React.Fragment>
                            {displayClientStatus === '' ?
                                <React.Fragment/>
                            :
                                <h3 key={index}>{`${displayClientStatus} to LG Display ${index + 1} @ ${this.props.displayAddresses[index]}`}</h3>
                            }
                        </React.Fragment>
                    ))}
            </div>
        )
    }
}
export default DeviceStatus