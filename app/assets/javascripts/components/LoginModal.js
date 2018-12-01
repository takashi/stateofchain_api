import React from "react";
import Modal from "react-modal";
import { getAccount } from "../bcoinWrapper";

Modal.setAppElement("body");

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      type: null,
      account: null
    };
  }

  async componentDidMount() {
    let account = await getAccount();
    this.setState({ account });
  }

  handleOpenModal(type) {
    this.setState({ isModalOpen: true, type });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div className="LoginModalWrapper">
        <div className="GlobalHeader__userInfo">
          <a
            href=""
            className="GlobalHeader__userInfo__item"
            onClick={e => {
              e.preventDefault();
              this.handleOpenModal("login");
            }}
          >
            <li>Login</li>
          </a>
          <a
            href=""
            className="GlobalHeader__userInfo__item GlobalHeader__userInfo__item__signup"
            onClick={e => {
              e.preventDefault();
              this.handleOpenModal("signup");
            }}
          >
            <li>Registration</li>
          </a>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal.bind(this)}
          closeTimeoutMS={200}
          className="LoginModal"
        >
          {this.state.type === "signup" && (
            <form className="LoginModal__form" action="/users" method="post">
              <h2 className="LoginModal__heading">Registration</h2>
              <input
                type="hidden"
                name="authenticity_token"
                value={this.props.authenticity_token}
              />
              <div className="LoginModal__form__group">
                <label htmlFor="email">Email</label>
                <input type="email" name="user[email]" autoComplete="email" />
                <label htmlFor="pubkey" style={{ marginTop: ".5rem" }}>
                  Your Public Key is
                </label>
                <code style={{ fontSize: ".8rem", color: "#aaa" }}>
                  {this.state.account && this.state.account.accountKey}
                </code>
                <input
                  type="hidden"
                  name="user[pubkey]"
                  value={this.state.account && this.state.account.accountKey}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="LoginModal__form__submit"
                disabled={!this.state.account}
              />
              <div className="LoginModal__form__links">
                <a
                  href=""
                  onClick={e => {
                    e.preventDefault();
                    this.handleOpenModal("login");
                  }}
                >
                  Already have account
                </a>
              </div>
            </form>
          )}
          {this.state.type === "login" && (
            <form
              className="LoginModal__form"
              action="/users/sign_in"
              method="post"
            >
              <h2 className="LoginModal__heading">Login</h2>
              <input
                type="hidden"
                name="authenticity_token"
                value={this.props.authenticity_token}
              />
              <div className="LoginModal__form__group">
                <label htmlFor="email">Email</label>
                <input type="email" name="user[email]" autoComplete="email" />
                <label htmlFor="pubkey" style={{ marginTop: ".5rem" }}>
                  Your Public Key is
                </label>
                <code style={{ fontSize: ".8rem", color: "#aaa" }}>
                  {this.state.account && this.state.account.accountKey}
                </code>
                <input
                  type="hidden"
                  name="user[pubkey]"
                  value={this.state.account && this.state.account.accountKey}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="LoginModal__form__submit"
                disabled={!this.state.account}
              />
              <div className="LoginModal__form__links">
                <a
                  href=""
                  onClick={e => {
                    e.preventDefault();
                    this.handleOpenModal("signup");
                  }}
                >
                  Have no account?
                </a>
              </div>
            </form>
          )}
        </Modal>
      </div>
    );
  }
}
