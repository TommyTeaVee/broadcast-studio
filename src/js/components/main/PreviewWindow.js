import React from 'react'

import {getImage} from '../../../../api/NewTekTricasterApi'

const WebSocket = require('ws')
const DatauriParser = require('datauri/parser')

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
    startPreviewStream = () => {
        var url = `ws://${this.props.tricasterAddress}/v1/video_notifications?name=output1&xres=640&yres=480&q=100`
        var ws = new WebSocket(url)
        ws.onmessage = (message) => {
            console.log('message = ',message)
            ws.alive = true
            console.log('ws.alive = ',ws.alive)
            new Response(message.data)
                .arrayBuffer()
                .then(buffer => {
                    const parser = new DatauriParser()
                    let image = parser.format('jpeg',buffer)
                    //console.log('image = ',image)
                    this.setState({imageURL: image.content})
                })
        }
    }

    setClientKeepAlive = (ws) => {

        const endTimeout = () => {
            console.log('Terminating websocket on heartbeat timeout')
            ws.terminate()
        }

        ws.on('open', () => {
            ws.pingTimeout = setTimeout(endTimeout, config.websocket.pingInterval)
        })

        ws.on('ping', () => {
            clearTimeout(ws.pingTimeout)
            ws.pingTimeout = setTimeout(endTimeout, config.websocket.pingInterval)
        })

        ws.on('close', () => {
            clearTimeout(ws.pingTimeout)
        })

    }


    render() {
        return (
            <div id='preview-window'>


                <img id='preview-window-image' src={this.state.imageURL}/>

                
                <div id='preview-window-transport'>
                    <button onClick={()=> {this.startPreviewStream()}}>Get Preview Image</button>
                </div>
            </div>  
        )
    }
}
export default PreviewWindow