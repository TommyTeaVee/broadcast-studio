import React from 'react'

import '../../../style/components/shared/header.scss'

var headerTimeout

class HeaderButton extends React.Component {
    toggleModal = (label) => {
        if(this.props.modal === label) {
            this.props.setMainState('modal',null)
            this.props.setHeaderTimeout('clear')
        } else {
            this.props.setMainState('modal',label)
            this.props.setHeaderTimeout('set')
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.modal === this.props.label ?
                    <div className='header-button-container-active' onClick={()=> this.toggleModal(this.props.label)}>
                        <button className='header-button-active'>{this.props.label}</button>
                        <div className='header-button-arrow-active'/>
                    </div>
                :
                    <div className='header-button-container-inactive' onClick={()=> this.toggleModal(this.props.label)}>
                        <button className='header-button-inactive'>{this.props.label}</button>
                        <div className='header-button-arrow-inactive'/>
                    </div>
                }
            </React.Fragment>
        )
    }
}
class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <div className='header-button-list'>
                    <HeaderButton
                        // states
                        label='Displays'
                        modal={this.props.modal}
                        // methods
                        setMainState={this.props.setMainState}
                        setHeaderTimeout={this.props.setHeaderTimeout}
                    />
                    <HeaderButton
                        // states
                        label='Cameras'
                        modal={this.props.modal}
                        // methods
                        setMainState={this.props.setMainState}
                        setHeaderTimeout={this.props.setHeaderTimeout}
                    />
                    <HeaderButton
                        // states
                        label='System'
                        modal={this.props.modal}
                        // methods
                        setMainState={this.props.setMainState}
                        setHeaderTimeout={this.props.setHeaderTimeout}
                    />
                </div>
            </div>
        )
    }
}
export default Header