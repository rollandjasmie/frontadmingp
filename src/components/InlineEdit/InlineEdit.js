import React, { Component } from 'react';
import './InlineEdit.styles.scss';

class InlineEdit extends Component {
    constructor() {
        super();

        this.state = {
            label: '',
            value: '',
            isEdit: false,
            defaultValue: ''
        }
    }

    componentDidMount() {
        const { value } = this.props;

        document.addEventListener("keydown", this.handleKeyDown);

        this.setState({
            defaultValue: value,
            value: value,
            labelText: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        const { labelText } = this.state
        if (labelText !== value) {
            this.setState({
                labelText: value
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            if (this.state.isEdit === true) {
                const { defaultValue } = this.state;
                this.setState({
                    value: defaultValue
                }, () => {
                    this.toggleEdit();
                })
            }
        }
    }

    toggleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        }, () => {

        });
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    }

    cancelChange = () => {
        const { defaultValue } = this.state;

        this.setState({
            value: defaultValue
        }, () => {
            this.toggleEdit();
        })
    }

    onSave = () => {
        this.setState({
            isEdit: false
        }, () => {
            if (this.props.onSave) {
                const { value } = this.state;
                const { setEdit } = this.props;
                this.props.onSave(value);

                if (!setEdit) {
                    this.setState({
                        labelText: value
                    })
                }
            }
        });
    }

    render() {
        const { value, labelText, isEdit } = this.state;
        const { disabled, setEdit } = this.props;

        let defaultEdit = (
            <>
                <div>
                    <input
                        autoFocus
                        type="text"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="inline-full-name"
                        value={value}
                        onChange={({ target: { value } }) => this.handleChange(value)} />
                </div>
                <button onClick={this.onSave} className="ml-1 py-2 px-3 text-white bg-blue-600">Valider</button>
                <button onClick={this.cancelChange} className="ml-1 py-2 px-3 text-gray-700 bg-gray-400">Annuler</button>
            </>);

        if (setEdit) {
            defaultEdit = setEdit({
                handleChange: this.handleChange,
                cancelChange: this.cancelChange,
                onSave: this.onSave,
                labelText: labelText,
                value: value
            });
        }

        return (
            <div className="flex">
                { !isEdit ? (
                    // Champ initial / mode affichage
                    <>
                        <div>{labelText}</div> &nbsp;
                        {
                            !disabled ? (
                                <div className="edit-action" onClick={this.toggleEdit} style={{ color: 'blue', cursor: 'pointer' }}>Editer</div>
                            ) : null
                        }
                    </>
                ) : defaultEdit}
            </div>)
    }
}

export default InlineEdit;