import React from 'react'

import '../../../style/components/shared/header.scss'

class HeaderButton extends React.Component {
    toggleModal = (label) => {
        if(this.props.modal === label) {
            this.props.setMainState('modal',null)
        } else {
            this.props.setMainState('modal',label)
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
                />
                <HeaderButton
                    // states
                    label='Cameras'
                    modal={this.props.modal}
                    // methods
                    setMainState={this.props.setMainState}
                />
                </div>
            </div>
        )
    }
}
export default Header