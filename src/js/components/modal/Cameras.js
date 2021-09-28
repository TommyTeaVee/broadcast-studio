import React from 'react'

import '../../../style/components/modal/cameras.scss'

class CameraPreset extends React.Component {
    render() {
        return (
            <button className='camera-preset'>{this.props.preset}</button>
        )
    }
}
class Cameras extends React.Component {
    state = {
        cameraIndex: 0,
        cameraLabels: ['Front', 'Rear'],
        cameraPresets: ['Preset 1', 'Preset 2', 'Preset 3', 'Preset 4', 'Preset 5']
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
                        {this.state.cameraPresets.map((preset,index) => (
                            <CameraPreset
                                // states
                                key={index}
                                index={index}
                                preset={preset}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default Cameras