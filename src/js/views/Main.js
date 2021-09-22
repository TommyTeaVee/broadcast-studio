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
        selectedMacro: null
    }
    getTricasterMacros = () => {
        getMacroList('192.168.1.31')
        .then(macroFolders => this.setState({macroFolders}))
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
                        // methods
                        sendSwitcherCommand={this.props.sendSwitcherCommand}
                    />
                    <MacroList
                        // states
                        macroFolders={this.state.macroFolders}
                        selectedMacro={this.state.selectedMacro}
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