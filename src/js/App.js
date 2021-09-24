import React from 'react'
import Main from './views/Main'
import Booting from './views/Booting'

import ExtronSwHd4kPlusSeries from '../../control/ExtronSwHdPlusSeries'
import LgBasicControl from '../../control/LgBasicControl'

import { querySession } from '../../api/NewTekTricasterApi'

const net = require('net')

import '../style/App.scss'

/* SWITCHER CONTROL **********************************************************************************/
let switcher = new ExtronSwHd4kPlusSeries(2)
let switcherClient = {}
let switcherAddress = '127.0.0.1'

/* DISPLAY CONTROL ***********************************************************************************/
let displays = [
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01')
]
let displayClients = []
let displayAddresses = ['127.0.0.1','127.0.0.1','127.0.0.1','127.0.0.1']
let displayPorts = [52001,52002,52003,52004]

class App extends React.Component {
    state = {
        switcherStatus: {},
        switcherClientStatus: '',
        displayStatus: [{},{},{},{}],
        displayClientStatus: ['','','',''],
        systemBooting: false,
        systemBootSuccessful: false,
    }
    /* SWITCHER CONTROL *****************************************************************************/
    createSwitcherClient = () => {
        switcherClient = net.connect({address: switcherAddress, port: 23}, ()=> {
            switcherClient.on('data', data => {
                console.log('data = ',data.toString())
                this.setState({switcherStatus: switcher.parseResponse(data.toString())})
            })
            if(switcherClient.localAddress === undefined) {
                this.setState({switcherClientStatus: 'Not Connected'})
            } else {
                this.setState({switcherClientStatus: 'Connected'})
                this.switcherQueryCycle()
            }
        })
    }
    switcherQueryCycle = () => {
        setInterval(() => {
            if(switcherClient.localAddress === undefined) {
                this.createSwitcherClient()
            }
            this.sendSwitcherCommand(switcher.viewInputSelection())
        },5000)
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
    createDisplayClient = (index,address,port) => {
        displayClients[index] = net.connect({address: address, port: port}, ()=> {
            let displayStatus = this.state.displayStatus
            displayClients[index].on('data', data => {
                displayStatus[index] = displays[index].parseResponse(data.toString())
                if(displayStatus[index].power === 'power on' && displayStatus[index].input !== 'hdmi1') {
                    setTimeout(()=> {
                        this.sendDisplayCommand(index,displays[index].setInputSelection('HDMI1'))
                    },5000)
                }
                this.setState({displayStatus})
            })
            let displayClientStatus = this.state.displayClientStatus
            if(displayClients[index].localAddress === undefined) {
                displayClientStatus[index] = 'Not Connected'
            } else {
                displayClientStatus[index] = 'Connected'
            }
            this.setState({displayClientStatus})
        })
    }
    sendDisplayCommand = (index,command) => {
        displayClients[index].write(command)
    }


    /* CAMERA CONTROL *******************************************************************************/

    /* TRICASTER CONTROL ****************************************************************************/

    /* INITIALIZE ***********************************************************************************/
    initialize = () => {
        this.setState({systemBooting: true})

        setTimeout(()=> this.setState({switcherClientStatus: 'Connecting'}))
        setTimeout(()=> this.setState({switcherClientStatus: this.createSwitcherClient()}),1000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[0] = 'Connecting'
            this.setState({displayClientStatus})},2000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[0] = this.createDisplayClient(0,displayAddresses[0],displayPorts[0])
            this.setState({displayClientStatus})},3000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[1] = 'Connecting'
            this.setState({displayClientStatus})},4000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[1] = this.createDisplayClient(1,displayAddresses[1],displayPorts[1])
            this.setState({displayClientStatus})},5000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[2] = 'Connecting'
            this.setState({displayClientStatus})},6000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[2] = this.createDisplayClient(2,displayAddresses[2],displayPorts[2])
            this.setState({displayClientStatus})},7000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[3] = 'Connecting'
            this.setState({displayClientStatus})},8000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[3] = this.createDisplayClient(3,displayAddresses[3],displayPorts[3])
            this.setState({displayClientStatus})},9000)

        setTimeout(()=> {this.setState({systemBooting: false})},10000)
    }
    render() {
        console.log('switcherStatus = ',this.state.switcherStatus)
        return (
            <div id='app'>
                {this.state.systemBooting === true ?
                    <Booting
                        // states
                        switcherClientStatus={this.state.switcherClientStatus}
                        switcherAddress={switcherAddress}
                        displayClientStatus={this.state.displayClientStatus}
                        displayAddresses={displayAddresses}
                    />
                :
                    <Main
                        // states
                        switcher={switcher}
                        switcherStatus={this.state.switcherStatus}
                        displays={displays}
                        displayStatus={this.state.displayStatus}
                        // methods
                        sendSwitcherCommand={this.sendSwitcherCommand}
                        sendDisplayCommand={this.sendDisplayCommand}
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