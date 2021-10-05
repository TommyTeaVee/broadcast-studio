import React from 'react'

import SettingsHeader from '../components/settings/SettingsHeader'
import SettingsNavigation from '../components/settings/SettingsNavigation'
import SettingsComponent from '../components/settings/SettingsComponent'
import SettingsFooter from '../components/settings/SettingsFooter'

import '../../style/views/settings.scss'

const Store = require('electron-store')

class Settings extends React.Component {
    state = {
        settingsComponent: 'devices'
    }
    setSettingsState = (key,value) => {
        console.log('set settings state')
        this.setState({[key]: value})
    }
    render() {
        return (
            <div id='settings'>
                <SettingsHeader/>
                <div id='settings-center'>
                    <SettingsNavigation
                        // states
                        settingsComponent={this.state.settingsComponent}
                        // methods
                        setSettingsState={this.setSettingsState}
                    />
                    <SettingsComponent
                        // states
                        settingsComponent={this.state.settingsComponent}
                    />
                </div>
                <SettingsFooter/>
            </div>
        )
    }
}
export default Settings