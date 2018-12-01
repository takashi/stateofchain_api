import React from 'react'

const Avatar = ({ imageUrl, className }) => {
  return (
    <img
      src={imageUrl}
      className={className ? className : 'globalHeader__UserInfo__avatar'}
    />
  )
}

export default Avatar
