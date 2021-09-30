import React from 'react'
import Main from './views/Main'
import Booting from './views/Booting'

import ExtronSwHd4kPlusSeries from '../../control/ExtronSwHdPlusSeries'
import LgBasicControl from '../../control/LgBasicControl'
import ViscaOverIp from '../../control/ViscaOverIp'

import { querySession } from '../../api/NewTekTricasterApi'

const net = require('net')
const dgram = require('dgram')

import '../style/App.scss'
import { toLinuxArchString } from 'builder-util'

/* SWITCHER CONTROL **********************************************************************************/
var switcher = new ExtronSwHd4kPlusSeries(2)
var switcherClient = {}
const switcherAddress = '127.0.0.1'

/* DISPLAY CONTROL ***********************************************************************************/
var displays = [
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01'),
    new LgBasicControl('01')
]
var displayClients = []
const displayAddresses = ['127.0.0.1','127.0.0.1','127.0.0.1','127.0.0.1']
const displayPorts = [54001,54002,54003,54004]

/* TRICASTER CONTROL *********************************************************************************/
const tricasterAddress = '192.168.1.31'

/* CAMERA CONTROL ************************************************************************************/
var cameras = [
    new ViscaOverIp(1,8,8,2),
    new ViscaOverIp(1,8,8,2)
]
var cameraClients = []
const cameraAddresses = ['127.0.0.1','127.0.0.1']
const cameraPorts = [53001,53002]

class App extends React.Component {
    state = {
        system: {
            systemSetting: 'studio',
            settings: [
                {label: 'Broadcast Studio', value: 'studio'},
                {label: 'Teams Room', value: 'teams'},
                {label: 'Signage', value: 'signage'}
            ],
            activeAlert: false,
            alerts: []
        },
        switcherStatus: {},
        switcherClientStatus: '',
        displayStatus: [{},{},{},{}],
        displayClientStatus: ['','','',''],
        systemBooting: false,
        systemBootSuccessful: false,
        tricasterCommStatus: ''
    }
    /* SWITCHER CONTROL *****************************************************************************/
    createSwitcherClient = () => {
        switcherClient = net.connect({address: switcherAddress, port: 23}, ()=> {
            switcherClient.on('data', data => {
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
                this.addSystemAlert({header: 'Extron SW2-HD', body: 'Lost Communication'})
                this.createSwitcherClient()
            } else {
                if(this.state.system.alerts.length > 0) {
                    this.removeSystemAlert({header: 'Extron SW2-HD', body: 'Lost Communication'})
                }
                this.sendSwitcherCommand(switcher.viewInputSelection())
            }
        },5000)
    }
    sendSwitcherCommand = command => {
        switcherClient.write(command)
    }
    /* DISPLAY CONTROL ******************************************************************************/
    displayQueryCycle = index => {
        setInterval(()=> {
            if(displayClients[index].localAddress === undefined) {
                this.addSystemAlert({header: `LG Display #${index + 1}`, body: 'Lost Communication'})
                this.createDisplayClient(index,displayAddresses[index],displayPorts[index])
            } else {
                if(this.state.system.alerts.length > 0) {
                    this.removeSystemAlert({header: `LG Display #${index + 1}`, body: 'Lost Communication'})
                }
                this.sendDisplayCommand(index,displays[index].viewPower())
            }
        },5000)
    }
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
                this.displayQueryCycle(index)
            }
            this.setState({displayClientStatus})
        })
    }
    sendDisplayCommand = (index,command) => {
        displayClients[index].write(command)
    }
    /* CAMERA CONTROL *******************************************************************************/
    createCameraClient = () => {
        cameraClients.push(dgram.createSocket('udp4')) 
    }
    sendCameraCommand = (index,command) => {
        console.log(`camera ${index} command ~ ${command}`)
        cameraClients[index].send(command, 0, command.length, cameraPorts[index], cameraAddresses[index], function(err, bytes) {
            if(err) throw err
        })
    }
    /* TRICASTER CONTROL ****************************************************************************/
    initializeTricasterSession = () => {
        querySession(tricasterAddress)
        .then(resText => {
            if(resText.search('TRUE') > -1) {
                this.setState({tricasterCommStatus: 'Connected'})
            } else {
                this.setState({tricasterCommStatus: 'Not Connected'})
            }
        })
    }
    /* MAGEWELL CONTROL *****************************************************************************/

    
    /* SYSTEM ***************************************************************************************/
    setSystemAlert = status => {
        let system = this.state.system
        system.activeAlert = status
        this.setState({system})
    }
    addSystemAlert = thisAlert => {
        let system = this.state.system
        let allowAdd = true
        system.alerts.map(alert => {
            if(alert.header === thisAlert.header) {
                allowAdd = false
            }
        })
        if(allowAdd === true) {
            system.alerts.push(thisAlert)
        }
        this.setState({system})
    }
    removeSystemAlert = thisAlert => {
        console.log(`remove ${thisAlert.header} alert`)
        let system = this.state.system
        system.alerts.map((alert,index) => {
            if(alert.header === thisAlert.header) {
                system.alerts.splice(index,1)
            }
        })
        this.setState({system})
    }
    /* INITIALIZE ***********************************************************************************/
    initialize = () => {
        let displaysConnectedCount = 0

        setTimeout(()=> this.setState({switcherClientStatus: 'Connecting'}))
        setTimeout(()=> {this.createSwitcherClient()},500)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[0] = 'Connecting'
            this.setState({displayClientStatus})},1000)
        setTimeout(()=> {this.createDisplayClient(0,displayAddresses[0],displayPorts[0])},1500)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[1] = 'Connecting'
            this.setState({displayClientStatus})},2000)
        setTimeout(()=> {this.createDisplayClient(1,displayAddresses[1],displayPorts[1])},2500)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[2] = 'Connecting'
            this.setState({displayClientStatus})},3000)
        setTimeout(()=> {this.createDisplayClient(2,displayAddresses[2],displayPorts[2])},3500)

        setTimeout(()=> {
            let displayClientStatus = this.state.displayClientStatus
            displayClientStatus[3] = 'Connecting'
            this.setState({displayClientStatus})},4000)
        setTimeout(()=> {this.createDisplayClient(3,displayAddresses[3],displayPorts[3])},4500)

        setTimeout(()=> this.setState({tricasterCommStatus: 'Connecting'}),5000)
        setTimeout(()=> this.initializeTricasterSession(),5500)


        setTimeout(()=> this.createCameraClient(0),6000)
        setTimeout(()=> this.createCameraClient(1),6500)

        setTimeout(()=> {
            for(let displayClientStatus of this.state.displayClientStatus) {
                if(displayClientStatus === 'Connected') {
                    displaysConnectedCount += 1
                }
            }
        },7000)

        setTimeout(()=> {
            if(this.state.switcherClientStatus === 'Connected' && displaysConnectedCount === 4 && this.state.tricasterCommStatus === 'Connected') {
                this.setState({systemBooting: false})
            }
        },7500)
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
                        tricasterCommStatus={this.state.tricasterCommStatus}
                        tricasterAddress={tricasterAddress}
                    />
                :
                    <Main
                        // states
                        system={this.state.system}
                        switcher={switcher}
                        switcherStatus={this.state.switcherStatus}
                        displays={displays}
                        displayStatus={this.state.displayStatus}
                        cameras={cameras}
                        tricasterAddress={tricasterAddress}
                        // methods
                        sendSwitcherCommand={this.sendSwitcherCommand}
                        sendDisplayCommand={this.sendDisplayCommand}
                        sendCameraCommand={this.sendCameraCommand}
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