import React from 'react'

import Loader from '../../components/shared/Loader'

class DeviceConnection extends React.Component {
    render() {
        return (
            <div className='device-connection'> 
                <h3>{`${this.props.clientStatus} to ${this.props.clientName} (${this.props.clientAddress})`}</h3>
                {this.props.clientStatus === 'Connecting' ? 
                    <Loader
                        width='25px'
                        height='25px'
                    />
                :
                    <h1 className='device-connection-checkbox'>&#10003;</h1>
                }
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
                        <DeviceConnection
                            // states
                            clientStatus={this.props.switcherClientStatus}
                            clientName='Extron SW-HD 4K Plus'
                            clientAddress={this.props.switcherAddress}
                        />
                    }
                    {this.props.displayClientStatus.map((displayClientStatus,index) => (
                        <React.Fragment>
                            {displayClientStatus === '' ?
                                <React.Fragment/>
                            :
                                <DeviceConnection
                                    // states
                                    key={index}
                                    clientStatus={displayClientStatus}
                                    clientName={`LG Display ${index + 1}`}
                                    clientAddress={this.props.displayAddresses[index]}

                                />
                            }
                        </React.Fragment>
                    ))}
            </div>
        )
    }
}
export default DeviceStatus