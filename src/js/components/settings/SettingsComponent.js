import React from 'react'

import Devices from '../../components/settings/Devices'
import Tricaster from '../../components/settings/Tricaster'

class SettingsComponent extends React.Component {
    returnComponent = component => {
        switch(component) {
            case 'devices': return <Devices/>
            case 'displays': return <h1>Displays</h1>
            case 'magewell': return <h1>Magewell</h1>
            case 'cameras': return <h1>Cameras</h1>
            case 'tricaster': return <Tricaster/>
        }
    }
    render() {
        return (
            <div id='settings-component'>
                {this.returnComponent(this.props.settingsComponent)}
            </div>
        )
    }
}
export default SettingsComponent