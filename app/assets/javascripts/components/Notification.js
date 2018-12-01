import React from "react";
import Modal from "react-modal";
import { createAccount } from "../bcoinWrapper";
import ActionCable from "actioncable";

Modal.setAppElement("body");

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      project: null,
      account: null
    };
  }

  async componentDidMount() {
    let account = await createAccount();

    this.setState({ account });

    const cable = ActionCable.createConsumer();

    cable.subscriptions.create("NotificationChannel", {
      connected: () => {
        console.log("hello");
      },

      disconnected: () => {
        console.log("unhello");
      },

      received: data => {
        console.log(JSON.parse(data.message));

        this.setState({
          isModalOpen: true,
          project: JSON.parse(data.message)
        });
      }
    });
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div className="ProjectSingle__fundWrapper">
        <Modal
          isOpen={this.state.isModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal.bind(this)}
          closeTimeoutMS={200}
          className="Notification"
        >
          {this.state.project && (
            <form
              className="Notification__form"
              action="/projects/join"
              method="post"
            >
              <h2 className="Notification__heading">
                <div className="Notification__author">
                  <img
                    src="https://avatars2.githubusercontent.com/u/1506738?s=460&v=4"
                    alt=""
                  />
                  <p>Takashi wants you to join project as OWNER</p>
                </div>
              </h2>
              <div className="Notification__project">
                <h2>{this.state.project.title}</h2>
                <p>{this.state.project.description}</p>
              </div>
              <input
                type="hidden"
                name="pubkey"
                value={this.state.account.accountKey}
              />
              <input
                type="hidden"
                name="project_id"
                value={this.state.project.id}
              />
              <input
                type="hidden"
                name="authenticity_token"
                value={this.props.authenticity_token}
              />
              <input
                type="submit"
                value="JOIN"
                className="Notification__form__submit"
                disabled={!this.state.account}
              />
            </form>
          )}
        </Modal>
      </div>
    );
  }
}
