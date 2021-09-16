import React from 'react'
import Main from './views/Main'

import ExtronSwHd4kPlusSeries from '../../control/ExtronSwHdPlusSeries'

const net = require('net')

import '../style/App.scss'

/* SWITCHER CONTROL **********************************************************************************/
let switcher = new ExtronSwHd4kPlusSeries(2)
let switcherClient = {}

class App extends React.Component {
    state = {
        switcherStatus: {},
        switcherClientStatus: ''
    }
    /* SWITCHER CONTROL *****************************************************************************/
    createSwitcherClient = () => {
        switcherClient = net.connect({address: '127.0.0.1', port: 23}, ()=> {
            this.setState({switcherClientStatus: 'Connected'})
        })
        switcherClient.on('data', data => {this.setState({switcherStatus: switcher.parseResponse(data.toString())})})
    }
    sendSwitcherCommand = command => {
        switcherClient.write(command)
    }
    render() {
        return (
            <div id='app'>
                <Main
                    // states
                    switcher={switcher}
                    switcherStatus={this.state.switcherStatus}
                    // methods
                    sendSwitcherCommand={this.sendSwitcherCommand}
                />
            </div>
        )
    }
    componentDidMount() {
        this.createSwitcherClient()
    }
}
export default App