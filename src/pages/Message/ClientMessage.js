import React, { Component } from 'react';
import axios from '../../axios';
import './message.css'

class ClientMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lire: false,
      contacts: []
    };
  }

  componentDidMount() {
    // Simple GET request using axios
    this.getMessage();
  }

  getMessage = () => {
    axios.get(`/contacts`)
      .then(res => {
        const contacts = res.data;
        this.setState({ contacts });
        
      })
  }

  deleteMessage = (message) => {
    axios.delete(`/contacts/${message.id}`).then(response => {
      if (response.status === 204) {
        this.getMessage();
      }
    })
  }



  render() {

    return (
      <div>
        <div class="col-md-12">
          <div class="contient-g">
            <div class="x_title">
              <h2>MESSAGE DES CLIENTS</h2>

              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <ul class="list-unstyled msg_list">
                {this.state.contacts.map(contact => {
                  return (
                    <li>
                      <a>
                        <span>
                          <span> <span className="Name-contact"> Nom : </span>{contact.nom} </span><br />
                          <span> <span className="Name-contact"> Prénom : </span>{contact.prenom} </span><br />
                          <span> <span className="Name-contact">Email : </span> {contact.email}</span><br />
                          <span> <span className="Name-contact"> Téléphone :</span> {contact.telephone}</span><br />
                          <span> <span className="Name-contact"> Date :</span> {contact.created_at}</span><br />
                        </span>
                        <span className="Name-contact"> Message : </span>
                        <span className="message">

                          {contact.message}
                        </span>
                      </a>
                      <span
                        onClick={() => this.deleteMessage(contact)}
                        className="delete">
                        <i>
                          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                          </svg>
                        </i>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientMessage;

