import React from 'react'

import Header from '../components/shared/Header'
import Displays from '../components/modal/Displays'
import Cameras from '../components/modal/Cameras'

import '../../style/views/modal.scss'

class Modal extends React.Component {
    returnModal = modal => {
        switch(modal) {
            case 'Displays': return (
                <Displays
                    // states
                    displays={this.props.displays}
                    displayStatus={this.props.displayStatus}
                    // methods
                    sendDisplayCommand={this.props.sendDisplayCommand}
                />
            )
            case 'Cameras': return (
                <Cameras
                    // states
                    cameras={this.props.cameras}
                    // methods
                    sendCameraCommand={this.props.sendCameraCommand}
                />
            )
        }
    }
    render() {
        return (
            <div id='modal'>
                <Header
                    // states
                    modal={this.props.modal}
                    // methods
                    setMainState={this.props.setMainState}
                />
                {this.props.modal === null ?
                    <React.Fragment/>
                :
                    <React.Fragment>
                        {this.returnModal(this.props.modal)}
                    </React.Fragment>
                }
            </div>
        )
    }
}
export default Modal