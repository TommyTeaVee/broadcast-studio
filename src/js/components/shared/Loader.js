import React from 'react'
import '../../../style/components/shared/loader.scss'

class Loader extends React.Component {
    render() {
        return (
            <div 
                className='loader'
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}
            />
        )
    }
}
export default Loader