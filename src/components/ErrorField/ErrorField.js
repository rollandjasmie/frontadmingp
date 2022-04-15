import React, { Component } from 'react'

export default class ErrorField extends Component {
    render() {
        const { errors, touched, row } = this.props;
        return (
            <div className="error-field">
                { errors[row] && touched[row] ? (
                    <div>{errors[row]}</div>
                ) : null }
            </div>
        )
    }
}
