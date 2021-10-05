import React from 'react'

import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

import PreviewWindow from '../components/main/PreviewWindow'
import PresenterControls from '../components/main/PresenterControls'
import MacroList from '../components/main/MacroList'
import Modal from  './Modal'

import '../../style/views/main.scss'

import {getMacroList} from '../../../api/NewTekTricasterApi'

var headerTimeout

class Main extends React.Component {
    state = {
        modal: null,
        macroFolders: [],
        selectedMacro: null,
        selectedMacroName: '',
        selectedMacroFolder: null,
        selectedMacroFolderName: null,
    }
    setMainState = (key,value) => {
        this.setState({[key]: value})
    }
    getTricasterMacros = () => {
        getMacroList(this.props.tricasterAddress)
        .then(macroFolders => {this.setState({macroFolders})})
    }
    setSelectedMacroFolder = thisMacroFolder => {
        this.setState({selectedMacroFolder: thisMacroFolder})
        this.setState({selectedMacroFolderName: thisMacroFolder.name})
    }
    setHeaderTimeout = action => {
        switch(action) {
            case 'set': {
                clearTimeout(headerTimeout)
                headerTimeout = setTimeout(() => {
                    this.setMainState('modal',null)
                },10000)
                break;
            }
            case 'clear': {
                clearTimeout(headerTimeout)
                break;
            }
        }
    }
    render() {
        return (
            <div id='main-view'>
                <Header 
                    // states
                    modal={this.state.modal}
                    // methods
                    setMainState={this.setMainState}
                    setHeaderTimeout={this.setHeaderTimeout}
                />
                <div id='main-view-controls'>
                    <PreviewWindow
                        // states
                        tricasterAddress={this.props.tricasterAddress}
                    />
                    <PresenterControls
                        // states
                        switcher={this.props.switcher}
                        switcherStatus={this.props.switcherStatus}
                        displays={this.props.displays}
                        displayStatus={this.props.displayStatus}
                        // methods
                        sendSwitcherCommand={this.props.sendSwitcherCommand}
                        sendDisplayCommand={this.props.sendDisplayCommand}
                    />
                    <MacroList
                        // states
                        macroFolders={this.state.macroFolders}
                        selectedMacro={this.state.selectedMacro}
                        selectedMacroName={this.state.selectedMacroName}
                        selectedMacroFolder={this.state.selectedMacroFolder}
                        selectedMacroFolderName={this.state.selectedMacroFolderName}
                        tricasterAddress={this.props.tricasterAddress}
                        // methods
                        setSelectedMacroFolder={this.setSelectedMacroFolder}
                        setMainState={this.setMainState}
                    />
                </div>
                <Footer/>
                {this.state.modal !== null ?
                    <Modal
                        // states
                        system={this.props.system}
                        modal={this.state.modal}
                        displays={this.props.displays}
                        displayStatus={this.props.displayStatus}
                        cameras={this.props.cameras}
                        // methods
                        setMainState={this.setMainState}
                        sendDisplayCommand={this.props.sendDisplayCommand}
                        sendCameraCommand={this.props.sendCameraCommand}
                        setHeaderTimeout={this.setHeaderTimeout}
                        setAppState={this.props.setAppState}
                    />
                :    
                    <React.Fragment/>
                }
            </div>
        )
    }
    componentDidMount() {
        this.getTricasterMacros()
    }
}
export default Main