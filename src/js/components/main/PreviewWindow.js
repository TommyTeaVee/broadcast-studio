import React from 'react'

import {getImage} from '../../../../api/NewTekTricasterApi'

const WebSocket = require('ws')
const DatauriParser = require('datauri/parser')

var ws

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
        imageURL: '',
        previewStatus: 'stop'
    }
    getPreviewImage = () => {
        getImage(this.props.tricasterAddress,'output1',640,480,100)
        .then(image => {
            this.setState({imageURL: URL.createObjectURL(image)})
        })
    }
    startPreviewStream = () => {
        var url = `ws://${this.props.tricasterAddress}/v1/video_notifications?name=output1&xres=640&yres=480&q=100`
        ws = new WebSocket(url)
        ws.onmessage = (message) => {
            console.log('message = ',message)
            ws.alive = true
            console.log('ws.alive = ',ws.alive)
            new Response(message.data)
                .arrayBuffer()
                .then(buffer => {
                    const parser = new DatauriParser()
                    let image = parser.format('jpeg',buffer)
                    this.setState({imageURL: image.content})
                })
        }
        
        // need a way to keep the websocket open during previewing

        this.setState({previewStatus: 'play'})
    }
    stopPreviewStream = () => {
        ws.close()
        this.setState({imageURL: ''})
        this.setState({previewStatus: 'stop'})
    }
    pausePreviewStream = () => {
        ws.close()
        this.setState({previewStatus: 'pause'})
    }




    render() {
        return (
            <div id='preview-window'>


                <img id='preview-window-image' src={this.state.imageURL}/>

                
                <div id='preview-window-transport'>
                    {this.state.previewStatus === 'play' ?
                        <React.Fragment>
                            <button className='preview-window-transport-button-active' onClick={this.startPreviewStream}>Play</button>
                            <button className='preview-window-transport-button-inactive' onClick={this.stopPreviewStream}>Stop</button>
                            <button className='preview-window-transport-button-inactive' onClick={this.pausePreviewStream}>Pause</button>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            {this.state.previewStatus === 'stop' ?
                                <React.Fragment>
                                    <button className='preview-window-transport-button-inactive' onClick={()=> {this.startPreviewStream()}}>Play</button>
                                    <button className='preview-window-transport-button-active' onClick={this.stopPreviewStream}>Stop</button>
                                    <button className='preview-window-transport-button-inactive' onClick={this.pausePreviewStream}>Pause</button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <button className='preview-window-transport-button-inactive' onClick={()=> {this.startPreviewStream()}}>Play</button>
                                    <button className='preview-window-transport-button-inactive' onClick={this.stopPreviewStream}>Stop</button>
                                    <button className='preview-window-transport-button-active' onClick={this.pausePreviewStream}>Pause</button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                </div>
            </div>  
        )
    }
}
export default PreviewWindow