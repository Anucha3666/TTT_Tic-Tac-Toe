import React, { ReactNode, MouseEvent } from "react";

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  style?: React.CSSProperties;
  _hover?: {
    scale: number;
  };
  _active?: {
    scale: number;
  };
};

const Button: React.FC<Props> = ({
  onClick = () => {},
  children = <></>,
  style = {},
  _hover = {
    scale: 1,
  },
  _active = {
    scale: 1,
  },
}) => {
  const { scale: scaleHover } = _hover;
  const { scale: scaleActive } = _active;
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm
      hover:scale-${scaleHover * 100} active:scale-${scaleActive * 100}`}
      style={style}>
      {children}
    </button>
  );
};

export default Button;
