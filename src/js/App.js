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
let displayAddresses = ['192,168.1.41','192,168.1.42','192,168.1.43','192,168.1.44']

class App extends React.Component {
    state = {
        switcherStatus: {},
        switcherClientStatus: '',
        displayStatus: [],
        displayClientStatus: ['','','',''],
        systemBooting: false,
        systemBootSuccessful: false,
    }
    /* SWITCHER CONTROL *****************************************************************************/
    createSwitcherClient = () => {
        console.log('create switcher client')
        switcherClient = net.connect({address: switcherAddress, port: 23}, ()=> {
            this.setState({switcherClientStatus: 'Connected'})
            switcherClient.on('data', data => {this.setState({switcherStatus: switcher.parseResponse(data.toString())})})
            return 'Connected'
        })
        return 'Not Connected'
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
            return 'Connected'
        })
        return 'Not Connected'

    }
    sendDisplayCommands = (command,index) => {
        displayClients[index].write(command)
    }
    /* CAMERA CONTROL *******************************************************************************/

    /* TRICASTER CONTROL ****************************************************************************/

    /* INITIALIZE ***********************************************************************************/
    initialize = () => {
        this.setState({systemBooting: false})

        setTimeout(()=> this.setState({switcherClientStatus: 'Connecting'}))
        setTimeout(()=> this.setState({switcherClientStatus: this.createSwitcherClient()}),1000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[0] = 'Connecting'
            this.setState({displayClientStatus})},2000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[0] = this.createDisplayClient(0,switcherAddress[0])
            this.setState({displayClientStatus})},3000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[1] = 'Connecting'
            this.setState({displayClientStatus})},4000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[1] = this.createDisplayClient(1,switcherAddress[1])
            this.setState({displayClientStatus})},5000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[2] = 'Connecting'
            this.setState({displayClientStatus})},6000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[2] = this.createDisplayClient(2,switcherAddress[2])
            this.setState({displayClientStatus})},7000)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[3] = 'Connecting'
            this.setState({displayClientStatus})},8000)
        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[3] = this.createDisplayClient(3,switcherAddress[3])
            this.setState({displayClientStatus})},9000)
    }
    render() {
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