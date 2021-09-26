import React from 'react'

import '../../../style/components/shared/header.scss'

class HeaderButton extends React.Component {
    render() {
        return (
            <button className='header-button-inactive'>{this.props.label}</button>
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
                    label='Help'
                />
                <HeaderButton
                    // states
                    label='Home'
                />
                </div>
            </div>
        )
    }
}
export default Header