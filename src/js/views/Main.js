import React from 'react'

import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

import PreviewWindow from '../components/main/PreviewWindow'
import PresenterControls from '../components/main/PresenterControls'
import MacroList from '../components/main/MacroList'

import '../../style/views/main.scss'

class Main extends React.Component {
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
                    <MacroList/>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Main