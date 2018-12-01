import React from "react";
import { compose, lifecycle, withState } from "recompose";

const enhance = compose(
  withState("visibility", "updateVisibility", ""),
  lifecycle({
    componentDidMount() {
      setTimeout(() => {
        this.setState({ visibility: "hidden" });
      }, 3000);
    }
  })
);

const Alert = ({ type, message, visibility, updateVisibility }) => {
  let classForAlert;
  switch (type) {
    case "success":
      classForAlert = "SuccessAlert";
      break;
    case "error":
      classForAlert = "ErrorAlert";
      break;
  }

  return (
    <div className={classForAlert} style={{ visibility }}>
      <div className="Alert__inner">
        <p>{message}</p>
        <p
          className="Alert__inner__closeButton"
          onClick={() => updateVisibility("hidden")}
        >
          x
        </p>
      </div>
    </div>
  );
};

export default enhance(Alert);
