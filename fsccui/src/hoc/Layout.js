import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Layout extends Component {
    render() {
        //  
        return (
            <div>
                <Header appName="Fullstack Engineer Coding Challenge 2"/>
                <div style={{ marginTop: '48px'}}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;