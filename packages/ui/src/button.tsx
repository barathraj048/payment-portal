"use client";

import { ReactNode,MouseEventHandler } from "react";

interface ButtonProps {
  children: any;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, className ,onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}>
      {children}
    </button>
  );
};
