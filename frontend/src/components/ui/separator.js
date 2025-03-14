import * as React from "react";

const Separator = ({ className, ...props }) => {
  return <div className={`border-t border-gray-300 my-4 ${className}`} {...props} />;
};

export default Separator;
