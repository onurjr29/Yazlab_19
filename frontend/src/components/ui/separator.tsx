import * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Separator = ({ className, ...props }: SeparatorProps) => {
  return <div className={`border-t border-gray-300 my-4 ${className}`} {...props} />;
};

export default Separator;
