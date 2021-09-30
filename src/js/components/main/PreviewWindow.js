import React from 'react'

import {getImage} from '../../../../api/NewTekTricasterApi'

const WebSocket = require('ws')
const DatauriParser = require('datauri/parser')

var ws
var heartbeat

class PreviewWindow extends React.Component {
    state = {
        imageURL: '',
        previewStatus: 'stop'
    }
    handleHeartbeat = state => {
        if(state === true) {
            heartbeat = setInterval(() => {
                ws.send('heartbeat')
                console.log('Thud!')
            },5000)
        } else {
            clearInterval(heartbeat)
        }
    }
    startPreviewStream = () => {
        var url = `ws://${this.props.tricasterAddress}/v1/video_notifications?name=output1&xres=640&yres=480&q=100`
        ws = new WebSocket(url)
        ws.onmessage = (message) => {
            new Response(message.data)
                .arrayBuffer()
                .then(buffer => {
                    const parser = new DatauriParser()
                    let image = parser.format('jpeg',buffer)
                    this.setState({imageURL: image.content})
                })
        }
        this.setState({previewStatus: 'play'})
        this.handleHeartbeat(true)
    }
    stopPreviewStream = () => {
        ws.close()
        setTimeout(() => {
            this.setState({imageURL: ''})
            this.setState({previewStatus: 'stop'})
            this.handleHeartbeat(false)
        },500)

    }
    pausePreviewStream = () => {
        if(this.state.previewStatus === 'play') {
            ws.close()
            this.setState({previewStatus: 'pause'})
        }
    }

    render() {
        return (
            <div id='preview-window'>
                {this.state.imageURL.length > 0 ?
                    <img className='preview-window-image' src={this.state.imageURL}/>
                :
                    <div className='preview-window-image'>
                        <h1>Steelcase Broadcast Studio</h1>
                        <p>Start video preview below</p>
                    </div>

                }
                <div id='preview-window-transport'>
                    {this.state.previewStatus === 'play' ?
                        <React.Fragment>
                            <button className='preview-window-transport-button-active' onClick={this.startPreviewStream}><div className='preview-window-transport-play-active'/></button>
                            <button className='preview-window-transport-button-inactive' onClick={this.stopPreviewStream}><div className='preview-window-transport-stop-inactive'/></button>
                            <button className='preview-window-transport-button-inactive' onClick={this.pausePreviewStream}>
                                <div className='preview-window-transport-pause-container'>
                                    <div className='preview-window-transport-pause-inactive'/>
                                    <div className='preview-window-transport-pause-inactive'/>
                                </div>
                            </button>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            {this.state.previewStatus === 'stop' ?
                                <React.Fragment>
                                    <button className='preview-window-transport-button-inactive' onClick={()=> {this.startPreviewStream()}}><div className='preview-window-transport-play-inactive'/></button>
                                    <button className='preview-window-transport-button-active' onClick={this.stopPreviewStream}><div className='preview-window-transport-stop-active'/></button>
                                    <button className='preview-window-transport-button-inactive' onClick={this.pausePreviewStream}>
                                        <div className='preview-window-transport-pause-container'>
                                            <div className='preview-window-transport-pause-inactive'/>
                                            <div className='preview-window-transport-pause-inactive'/>
                                        </div>
                                    </button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <button className='preview-window-transport-button-inactive' onClick={()=> {this.startPreviewStream()}}><div className='preview-window-transport-play-inactive'/></button>
                                    <button className='preview-window-transport-button-inactive' onClick={this.stopPreviewStream}><div className='preview-window-transport-stop-inactive'/></button>
                                    <button className='preview-window-transport-button-active' onClick={this.pausePreviewStream}>
                                        <div className='preview-window-transport-pause-container'>
                                            <div className='preview-window-transport-pause-active'/>
                                            <div className='preview-window-transport-pause-active'/>
                                        </div>
                                    </button>
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