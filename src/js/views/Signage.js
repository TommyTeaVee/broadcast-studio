import React from 'react'

import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

import '../../style/views/signage.scss'

class Signage extends React.Component {
    render() {
        return (
            <div id='signage-view'>
                 <Header/>
                 <div id='signage-view-controls'>

                 </div>
                 <Footer/>
            </div>
        )
    }
}
export default Signage