import React from "react";
import Modal from "react-modal";
import { getAccount } from "../bcoinWrapper";

Modal.setAppElement("body");

export default class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      account: null
    };
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
          <form className="LoginModal__form" action="/users" method="post">
            <h2 className="LoginModal__heading">Back their project</h2>
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
            />
          </form>
        </Modal>
      </div>
    );
  }
}
