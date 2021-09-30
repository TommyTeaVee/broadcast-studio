import React from 'react'

import '../../../style/components/modal/system.scss'

class SystemSetting extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.setting.value === this.props.systemSetting ?
                    <div className='system-setting-active'>
                        <h4>{this.props.setting.label}</h4>
                    </div>
                :
                    <div className='system-setting-inactive'>
                        <h4>{this.props.setting.label}</h4>
                    </div>
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
                    {this.props.system.activeAlert ? 
                        <div id='system-alert'>
                            <h3>System Alert</h3>
                            <p>View alert</p>
                        </div>
                    :
                        <React.Fragment/>
                    }
                </div>

                <div id='system-exit'><h3>Exit</h3></div>
            </div>
        )
    }
}
export default System