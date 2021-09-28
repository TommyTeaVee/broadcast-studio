import React from 'react'

import {getImage} from '../../../../api/NewTekTricasterApi'

class PreviewWindowButton extends React.Component {
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
class PreviewWindow extends React.Component {
    state = {
        imageURL: ''
    }
    getPreviewImage = () => {
        getImage(this.props.tricasterAddress,'output1',640,480,100)
        .then(image => {
            this.setState({imageURL: URL.createObjectURL(image)})
        })
    }
    render() {
        return (
            <div id='preview-window'>
                <button onClick={this.getPreviewImage}>Get Preview Image</button>
                <img src={this.state.imageURL}/>
            </div>  
        )
    }
}
export default PreviewWindow