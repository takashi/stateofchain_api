import React from "react";
import Avatar from "./Avatar";

export default class HeaderUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  onClickUserIcon(e) {
    if (this.state.isOpen) {
      document.removeEventListener(
        "mousedown",
        this.handleClickOutside.bind(this)
      );
    } else {
      document.addEventListener(
        "mousedown",
        this.handleClickOutside.bind(this)
      );
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isOpen: false });
      document.removeEventListener(
        "mousedown",
        this.handleClickOutside.bind(this)
      );
    }
  }

  render() {
    const { avatarImageUrl, currentUser } = this.props;

    return (
      <div
        className="HeaderUserInfo__UserInfoWrapper"
        ref={this.setWrapperRef.bind(this)}
      >
        <a href="/projects/new" className="GlobalHeader__createProject">
          Start Funding
        </a>
        <div
          className="HeaderUserInfo__UserInfo"
          onClick={this.onClickUserIcon.bind(this)}
        >
          <Avatar
            imageUrl={avatarImageUrl}
            className="HeaderUserInfo__UserInfo__avatar"
          />
        </div>
        <div
          className={
            "HeaderUserInfo__UserInfoDropdown " +
            (this.state.isOpen
              ? "HeaderUserInfo__UserInfoDropdown--open"
              : "HeaderUserInfo__UserInfoDropdown--close")
          }
        >
          <div className="HeaderUserInfo__UserInfoDropdown__user">
            <Avatar
              imageUrl={avatarImageUrl}
              className="HeaderUserInfo__UserInfo__avatar"
            />
            <div className="HeaderUserInfo__UserInfoDropdown__user__name">
              <p className="HeaderUserInfo__UserInfoDropdown__user__name__nickname">
                {currentUser.nickname}
              </p>
              <p className="HeaderUserInfo__UserInfoDropdown__user__name__email">
                {currentUser.email}
              </p>
            </div>
          </div>
          <ul>
            <li>
              <a href={"/users/" + currentUser.id}>マイページ</a>
            </li>
            <li>
              <a href="/settings">設定画面</a>
            </li>
            <li>
              <a href="/users/sign_out">ログアウト</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
