import React from "react";
import Modal from "react-modal";
import { getAccount } from "../bcoinWrapper";
import { fund } from "../bcoinWrapper";

Modal.setAppElement("body");

export default class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false, account: null };
  }

  async componentDidMount() {
    let account = await getAccount();
    this.setState({ account });
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  async handleOnClick(e) {
    e.preventDefault();
    let res = await fund(this.props.psbt);
    this.setState({ psbt: res.psbt });
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
            Back their project
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
            action="/fund"
            method="post"
            ref={f => {
              this._form = f;
            }}
          >
            <h2 className="LoginModal__heading">Back their project</h2>
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
            <div className="LoginModal__form__group">
              <label htmlFor="amount">Amount(BTC)</label>
              <input type="number" name="amount" />
            </div>
            <input
              type="submit"
              value="Back"
              className="LoginModal__form__submit"
              disabled={!this.state.account}
              onClick={this.handleOnClick.bind(this)}
            />
          </form>
        </Modal>
      </div>
    );
  }
}
