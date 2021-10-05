import React from 'react'

import '../../../style/components/modal/system.scss'

class SystemSetting extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.setting.value === this.props.systemSetting ?
                    <button className='system-setting-active'>
                        <h4>{this.props.setting.label}</h4>
                    </button>
                :
                    <button className='system-setting-inactive'>
                        <h4>{this.props.setting.label}</h4>
                    </button>
                }
            </React.Fragment>
        )
    }
}
class System extends React.Component {
    render() {
        return (
            <div id='system'>
                <div id='system-header'><h3>System Settings</h3></div>
                <div id='system-settings-list'>
                    {this.props.system.settings.map((setting,index) => (
                        <SystemSetting
                            key={setting.value}
                            setting={setting}
                            systemSetting={this.props.system.systemSetting}
                        />
                    ))}
                </div>
                <div id='system-alert-container'>
                    {this.props.system.alerts.length > 0 ? 
                        <div id='system-alert'>
                            <h4 id='system-alert-title'>System Alert</h4>
                            <ul id='system-alert-list'>
                                {this.props.system.alerts.map((alert,index) => (
                                    <li key={index}>{`${alert.header}: ${alert.body}`}</li>
                                ))} 
                            </ul>

                        </div>
                    :
                        <React.Fragment/>
                    }
                </div>
                
                <div id='system-footer'>
                    <button id='system-settings' className='system-footer-control' onClick={()=> this.props.setAppState('view','settings')}><h3>Settings</h3></button>
                    <button id='system-exit' className='system-footer-control'><h3>System Exit</h3></button>
                </div>
            </div>
        )
    }
}
export default System