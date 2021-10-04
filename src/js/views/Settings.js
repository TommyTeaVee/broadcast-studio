import React from 'react'

import SettingsHeader from '../components/settings/SettingsHeader'
import SettingsNavigation from '../components/settings/SettingsNavigation'
import SettingsComponent from '../components/settings/SettingsComponent'
import SettingsFooter from '../components/settings/SettingsFooter'

import '../../style/views/settings.scss'

const Store = require('electron-store')

class Settings extends React.Component {
    render() {
        return (
            <div id='settings'>
                <SettingsHeader/>
                <SettingsNavigation/>
                <SettingsComponent/>
                <SettingsFooter/>
            </div>
        )
    }
}
export default Settings