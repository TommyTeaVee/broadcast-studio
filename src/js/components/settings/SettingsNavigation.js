import React from 'react'

import '../../../style/components/settings/navigation.scss'

class SettingsNavigationButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.component.value === this.props.settingsComponent ? 
                    <button className='settings-component-active' onClick={()=> this.props.setSettingsState('settingsComponent',this.props.component.value)}><h3>{this.props.component.label}</h3></button>
                :
                    <button className='settings-component-inactive' onClick={()=> this.props.setSettingsState('settingsComponent',this.props.component.value)}><h3>{this.props.component.label}</h3></button>
                }
            </React.Fragment>
        )
    }
}
class SettingsNavigation extends React.Component {
    state = {
        components: [
            {label: 'Devices', value: 'devices'},
            {label: 'Displays', value: 'displays'},
            {label: 'Magewell', value: 'magewell'},
            {label: 'Cameras', value: 'cameras'},
            {label: 'Tricaster', value: 'tricaster'}
        ]
    }
    render() {
        return (
            <div id='settings-navigation'>
                <div id='settings-navigation-list'>
                    {this.state.components.map((component,index) => (
                        <SettingsNavigationButton
                            // states
                            key={index}
                            component={component}
                            settingsComponent={this.props.settingsComponent}
                            // methods
                            setSettingsState={this.props.setSettingsState}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
export default SettingsNavigation