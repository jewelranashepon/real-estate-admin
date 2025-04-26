"use client";

import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface JoEditorProps {
  placeholder?: string;
  content: string;
  onChange: (content: string) => void;
}

export const JoEditor: React.FC<JoEditorProps> = ({
  placeholder = "Start typing...",
  content,
  onChange,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
      toolbarSticky: false,
      spellcheck: true,
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => onChange(newContent)}
      onChange={() => {}} // prevent uncontrolled warning (Jodit needs both sometimes)
    />
  );
};
