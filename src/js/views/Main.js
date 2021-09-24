import React from 'react'

import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

import PreviewWindow from '../components/main/PreviewWindow'
import PresenterControls from '../components/main/PresenterControls'
import MacroList from '../components/main/MacroList'

import '../../style/views/main.scss'

import {getMacroList} from '../../../api/NewTekTricasterApi'

class Main extends React.Component {
    state = {
        macroFolders: [],
        selectedMacro: null,
        selectedMacroFolder: null,
        selectedMacroFolderName: null,
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
                <Header/>
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
            </div>
        )
    }
    componentDidMount() {
        this.getTricasterMacros()
    }
}
export default Main