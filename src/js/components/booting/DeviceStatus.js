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
                    <React.Fragment>
                        {this.props.clientStatus === 'Connected' ?
                            <h1 className='device-connection-success'>&#10004;</h1>
                        :
                            <h1 className='device-connection-failed'>&#10005;</h1>
                        }                           
                    </React.Fragment>
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
                    {this.props.tricasterCommStatus === '' ?
                        <React.Fragment/>
                    :
                        <DeviceConnection
                            // states
                            clientStatus={this.props.tricasterCommStatus}
                            clientName='Tricaster'
                            clientAddress={this.props.tricasterAddress}
                        />
                    }
            </div>
        )
    }
}
export default DeviceStatus