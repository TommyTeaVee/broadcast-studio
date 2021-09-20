import React from 'react'
import Main from './views/Main'
import Booting from './views/Booting'

import ExtronSwHd4kPlusSeries from '../../control/ExtronSwHdPlusSeries'
import LgBasicControl from '../../control/LgBasicControl'

const net = require('net')

import '../style/App.scss'

/* SWITCHER CONTROL **********************************************************************************/
let switcher = new ExtronSwHd4kPlusSeries(2)
let switcherClient = {}

/* DISPLAY CONTROL ***********************************************************************************/
let displays = [
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01')
]
let displayClients = []

class App extends React.Component {
    state = {
        switcherStatus: {},
        switcherClientStatus: '',
        displayStatus: [],
        displayClientStatus: [],
        systemBooting: false,
        systemBootSuccessful: false,
    }
    /* SWITCHER CONTROL *****************************************************************************/
    createSwitcherClient = () => {
        console.log('create switcher client')
        switcherClient = net.connect({address: '127.0.0.1', port: 23}, ()=> {
            this.setState({switcherClientStatus: 'Connected'})
            switcherClient.on('data', data => {this.setState({switcherStatus: switcher.parseResponse(data.toString())})})
            return 'Success'
        })
        return 'Failure'
    }
    sendSwitcherCommand = command => {
        switcherClient.write(command)
    }
    /* DISPLAY CONTROL ******************************************************************************/
    handleDisplayStatus = (index,data) => {
        let displayStatus = this.state.displayStatus
        displayStatus[index] = displays[index].parseResponse(data) 
        this.setState({displayStatus})
    }
    createDisplayClient = (index,address) => {
        let displayClientStatus = this.state.displayClientStatus
        displayClients[index] = net.connect({address: address, port: 9761}, ()=> {
            displayClientStatus[index] = 'Connected'
            displayClients[index].on('data', data => {this.handleDisplayStatus(index,data)})
            return 'Success'
        })
        return 'Failure'

    }

    // may be removing
    createDisplayClients = () => {
        let displayAddresses = ['192.168.1.41', '192.168.1.42', '192.168.1.43', '192.168.1.44']
        for(let displayIndex=0;displayIndex<displayAddresses.length;displayIndex++) {
            setTimeout(this.createDisplayClient(displayIndex,displayAddresses[displayIndex]),500)
        }
    }

    
    sendSwitcherCommand = (command,index) => {
        displayClients[index].write(command)
    }
    /* CAMERA CONTROL *******************************************************************************/

    /* INITIALIZE ***********************************************************************************/
    initialize = () => {
        this.setState({systemBooting: true})
        setTimeout(()=> this.createSwitcherClient(),5000)
        setTimeout(()=> console.log('create display clients'),10000)
    }
    render() {
        return (
            <div id='app'>
                {this.state.systemBooting === true ?
                    <Booting/>
                :
                    <Main
                        // states
                        switcher={switcher}
                        switcherStatus={this.state.switcherStatus}
                        // methods
                        sendSwitcherCommand={this.sendSwitcherCommand}
                    />
                }
            </div>
        )
    }
    componentDidMount() {
        this.initialize()
    }
}
export default App