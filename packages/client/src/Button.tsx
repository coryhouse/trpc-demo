// Simple button styled with Tailwind
import React from "react";

// Typing strategy per https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="p-3 text-white bg-blue-500 border rounded shadow-lg outline-cyan-500"
    >
      {props.children}
    </button>
  );
}
