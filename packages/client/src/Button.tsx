// Simple button styled with Tailwind
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <button className="p-3 text-white bg-blue-500 border rounded shadow-lg outline-cyan-500">
      {props.children}
    </button>
  );
}
