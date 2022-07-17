import React from "react";

// Typing strategy per https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element
interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export default function Input(props: InputProps) {
  return (
    <input
      type="text"
      {...props}
      className="w-full p-5 border-2 border-gray-300 rounded-lg"
    />
  );
}
