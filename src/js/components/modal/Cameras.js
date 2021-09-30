import React from 'react'

import '../../../style/components/modal/cameras.scss'

class CameraPreset extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.preset.name === this.props.cameraCurrentPresets[this.props.cameraIndex].name ? 
                    <button className='camera-preset-active' onClick={()=> {this.props.handleCameraPreset(this.props.cameraIndex,this.props.preset,'recall')}}>{this.props.preset.name}</button>
                :
                    <button className='camera-preset-inactive' onClick={()=> this.props.handleCameraPreset(this.props.cameraIndex,this.props.preset,'recall')}>{this.props.preset.name}</button>
                }
            </React.Fragment>
        )
    }
}
class Cameras extends React.Component {
    state = {
        cameraIndex: 0,
        cameraLabels: ['Front', 'Rear'],
        cameraPresets: [
            [     
                {name: 'Preset 1', value: 1}, 
                {name: 'Preset 2', value: 2}, 
                {name: 'Preset 3', value: 3}, 
                {name: 'Preset 4', value: 4}, 
                {name: 'Preset 5', value: 5}
            ],
            [     
                {name: 'Preset 1', value: 1}, 
                {name: 'Preset 2', value: 2}, 
                {name: 'Preset 3', value: 3}, 
                {name: 'Preset 4', value: 4}, 
                {name: 'Preset 5', value: 5}
            ],
        ],
        cameraCurrentPresets: [{name: ''},{name: ''}]
    }
    clearCameraPreset = cameraIndex => {
        let cameraCurrentPresets = this.state.cameraCurrentPresets
        cameraCurrentPresets[cameraIndex] = ''
        this.setState({cameraCurrentPresets})
    }
    handleCameraPreset = (cameraIndex,preset,action) => {
        let cameraCurrentPresets = this.state.cameraCurrentPresets
        cameraCurrentPresets[cameraIndex] = preset
        this.setState({cameraCurrentPresets})
        this.props.sendCameraCommand(cameraIndex,this.props.cameras[cameraIndex].setPreset(action,preset.value))
    }
    cameraPtz = (cameraIndex,control) => {

    }
    render() {
        return (
            <div id='cameras'>
                <div id='camera-header'>Camera Controls</div>
                <div id='camera-selection'>
                    {this.state.cameraLabels.map((label,index) => (
                        <React.Fragment>
                            {this.state.cameraIndex === index ?
                                <button className='camera-selection-button-active' onClick={()=> this.setState({cameraIndex: index})}>{label}</button>
                            :
                                <button className='camera-selection-button-inactive' onClick={()=> this.setState({cameraIndex: index})}>{label}</button>
                            }
                        </React.Fragment>

                    ))}
                </div>
                <div id='camera-controls'>
                    <div id='camera-control-ptz'>

                        <div id='camera-control-ptz-top-row'>
                            <button id='camera-ptz-up' className='camera-arrow-button tilt'
                                onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('up'))}
                                onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                                <div className='camera-arrow-up'/>
                                <div className='camera-arrow-up' id='arrow-up-minus'/>
                            </button>
                        </div>

                        <div id='camera-control-ptz-middle-row'>
                            <button id='camera-ptz-left' className='camera-arrow-button pan'
                                onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('left'))}
                                onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                                <div className='camera-arrow-left'/>
                                <div className='camera-arrow-left' id='arrow-left-minus'/>
                            </button>

                            <div id='camera-control-ptz-zoom'>

                                <button id='camera-ptz-zoom-in' className='camera-ptz-zoom-button'
                                    onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('in'))}
                                    onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('stop'))}>
                                    +
                                </button>

                                <button id='camera-ptz-zoom-out' className='camera-ptz-zoom-button'
                                    onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('out'))}
                                    onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('stop'))}>
                                    -
                                </button>

                            </div>

                            <button id='camera-ptz-right' className='camera-arrow-button pan'
                                onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('right'))}
                                onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                                <div className='camera-arrow-right'/>
                                <div className='camera-arrow-right' id='arrow-right-minus'/>
                                    
                            </button>
                        </div>

                        <div id='camera-control-ptz-bottom-row'>
                            <button id='camera-ptz-down' className='camera-arrow-button tilt'
                                onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('down'))}
                                onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                                <div className='camera-arrow-down'/>
                                <div className='camera-arrow-down' id='arrow-down-minus'/>
                            </button>
                        </div>
                    </div>
                    <div id='camera-control-presets'>
                        {this.state.cameraPresets[this.state.cameraIndex].map((preset,index) => (
                            <CameraPreset
                                // states
                                key={index}
                                index={index}
                                preset={preset}
                                cameraIndex={this.state.cameraIndex}
                                cameraCurrentPresets={this.state.cameraCurrentPresets}
                                // methods
                                handleCameraPreset={this.handleCameraPreset}
                                
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default Cameras