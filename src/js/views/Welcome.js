import React from 'react'

import WelcomeHeader from '../components/welcome/WelcomeHeader'
import WelcomeFooter from '../components/welcome/WelcomeFooter'

class Welcome extends React.Component {
    render() {
        return (
            <div id='welcome'>
                <WelcomeHeader/>
                <WelcomeFooter/>
            </div>
        )
    }
}
export default Welcome