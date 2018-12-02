import React from "react";
import makeBlockie from "ethereum-blockies-base64";

const Avatar = ({ imageUrl, seed, className }) => {
  if (!imageUrl) {
    imageUrl = makeBlockie((seed * 1000).toString(16) + "wowowowowowowwowo");
  }

  return <img src={imageUrl} />;
};

export default Avatar;
