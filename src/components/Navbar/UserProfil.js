import React, { Component } from 'react';
import './UserProfil.scss';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { userLogoutAttempt } from '../../redux/Auth/auth.action';
import { connect } from 'react-redux';

class UserProfil extends Component {
    state = {
        show: false
    }

    render() {
        const { show } = this.state;
        const { user } = this.props;
       
        return (
            <div className="user-profil flex flex items-center justify-center">
                <div
                    onClick={() => this.setState({ show: !show })}
                    className="cursor-pointer flex flex items-center justify-center">
                    {user.username} &nbsp;
                    {show ? (<FaChevronUp />) : (<FaChevronDown />)}

                </div>
                <div className={`user-action ${this.state.show ? 'show' : ''}`}>
                    <div
                        onClick={() => this.props.userLogoutAttempt()}
                        className="action-item">Se déconnecter</div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAttempt: () => dispatch(userLogoutAttempt())
    }
}

export default connect(null, mapDispatchToProps)(UserProfil);