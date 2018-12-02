import React from "react";
import Select from "react-select";

export default ({ users }) => (
  <Select
    isMulti
    name="participants[]"
    options={users}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);
