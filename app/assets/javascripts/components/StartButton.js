import React from "react";
import Modal from "react-modal";
import { createMultisigAccount, createProject } from "../bcoinWrapper";

Modal.setAppElement("body");

export default class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false, account: null };
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  async handleOnClick(e) {
    e.preventDefault();
    let accName = await createMultisigAccount(this.props.pubkeys);
    let psbt = await createProject(accName);
    this.setState({ psbt });
    this._form.submit();
  }

  render() {
    return (
      <div className="ProjectSingle__fundWrapper">
        <div>
          <a
            href=""
            className="ProjectSingle__fund"
            onClick={e => {
              e.preventDefault();
              this.handleOpenModal("login");
            }}
          >
            Start project
          </a>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal.bind(this)}
          closeTimeoutMS={200}
          className="LoginModal"
        >
          <form
            className="LoginModal__form"
            action="/psbt"
            method="post"
            ref={f => {
              this._form = f;
            }}
          >
            <input
              type="hidden"
              name="authenticity_token"
              value={this.props.authenticity_token}
            />
            <input type="hidden" name="psbt" value={this.state.psbt} />
            <input
              type="hidden"
              name="project_id"
              value={this.props.project_id}
            />
            <input
              type="hidden"
              name="authenticity_token"
              value={this.props.authenticity_token}
            />
            <input
              type="submit"
              value="Start project"
              className="LoginModal__form__submit"
              onClick={this.handleOnClick.bind(this)}
            />
          </form>
        </Modal>
      </div>
    );
  }
}
