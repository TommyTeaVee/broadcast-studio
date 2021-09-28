import React from 'react'

import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

import PreviewWindow from '../components/main/PreviewWindow'
import PresenterControls from '../components/main/PresenterControls'
import MacroList from '../components/main/MacroList'
import Modal from  './Modal'

import '../../style/views/main.scss'

import {getMacroList} from '../../../api/NewTekTricasterApi'

class Main extends React.Component {
    state = {
        modal: null,
        macroFolders: [],
        selectedMacro: null,
        selectedMacroFolder: null,
        selectedMacroFolderName: null,
    }
    setMainState = (key,value) => {
        this.setState({[key]: value})
    }
    getTricasterMacros = () => {
        getMacroList('192.168.1.31')
        .then(macroFolders => this.setState({macroFolders}))
    }
    setSelectedMacroFolder = thisMacroFolder => {
        this.setState({selectedMacroFolder: thisMacroFolder})
        this.setState({selectedMacroFolderName: thisMacroFolder.name})
    }
    render() {
        return (
            <div id='main-view'>
                <Header 
                    // states
                    modal={this.state.modal}
                    // methods
                    setMainState={this.setMainState}
                />
                <div id='main-view-controls'>
                    <PreviewWindow/>
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
                        selectedMacroFolder={this.state.selectedMacroFolder}
                        selectedMacroFolderName={this.state.selectedMacroFolderName}
                        // methods
                        setSelectedMacroFolder={this.setSelectedMacroFolder}
                    />
                </div>
                <Footer/>
                {this.state.modal !== null ?
                    <Modal
                        // states
                        modal={this.state.modal}
                        displays={this.props.displays}
                        displayStatus={this.props.displayStatus}
                        cameras={this.props.cameras}
                        // methods
                        setMainState={this.setMainState}
                        sendDisplayCommand={this.props.sendDisplayCommand}
                        sendCameraCommand={this.props.sendCameraCommand}
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