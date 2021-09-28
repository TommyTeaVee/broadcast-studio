import React from 'react'

import '../../../style/components/modal/cameras.scss'

class Cameras extends React.Component {
    state = {
        cameraIndex: 0,
        cameraLabels: ['Front', 'Rear']
    }
    render() {
        return (
            <div id='cameras'>
                <div id='camera-header'>Camera Controls</div>
                <div id='camera-selection'>
                    {this.state.cameraLabels.map((label,index) => (
                        <button className='camera-selection-button' onClick={()=> this.setState({cameraIndex: index})}>{label}</button>
                    ))}
                </div>
                <div id='camera-controls'>
                    <div id='camera-control-ptz'>
                        <button id='camera-ptz-up' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('up'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                            <div id='camera-arrow-up'/>
                        </button>

                        <button id='camera-ptz-left' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('left'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                            <div id='camera-arrow-left'/>
                        </button>

                        <button id='camera-ptz-zoom-in' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('in'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('stop'))}>
                            +
                        </button>

                        <button id='camera-ptz-up' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('out'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setZoom('stop'))}>
                            -
                        </button>

                        <button id='camera-ptz-right' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('right'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                            <div id='camera-arrow-right'/>
                        </button>

                        <button id='camera-ptz-down' 
                            onMouseDown={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('down'))}
                            onMouseUp={()=> this.props.sendCameraCommand(this.state.cameraIndex,this.props.cameras[this.state.cameraIndex].setPanTilt('stop'))}>
                            <div id='camera-arrow-down'/>
                        </button>
                    </div>
                    <div id='camera-control-presets'>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Cameras