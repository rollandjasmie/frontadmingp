import React, { Component } from 'react'
import './Navbar.styles.scss';
import { connect } from 'react-redux';
import UserProfil from './UserProfil';


class Navbar extends Component {
    render() {
        const { user } = this.props;
        return (
            <>
                <header className="navbar-block text-white body-font bg-black">
                    <div className="flex flex-wrap p-10 flex-col md:flex-row items-center">
                        <nav className="md:ml-auto text-base justify-center">
                            <UserProfil user={user}/>
                        </nav>
                    </div>
                    
                </header>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

export default connect(mapStateToProps)(Navbar);