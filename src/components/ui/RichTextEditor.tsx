// src/components/ui/RichTextEditor.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import "quill-table-ui/dist/index.css";
import "quill/dist/quill.snow.css";

// Dynamically import ReactQuill and register TableUI to avoid SSR errors
const ReactQuill = dynamic(
  async () => {
    const { default: RQ, Quill } = await import("react-quill-new");
    const { default: TableUI } = await import("quill-table-ui");
    if (Quill) {
      // Register the TableUI module
      Quill.register(
        {
          "modules/tableUI": TableUI,
        },
        true
      );
    }
    return RQ;
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Editor configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
    ["table"],
  ],
  table: true,
  tableUI: true,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "align",
  "color",
  "background",
  "link",
  "image",
  "table",
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  return (
    <div className={`rich-text-editor ${className || ""}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="bg-white rounded-sm border border-surface-variant"
      />
      {/* Global styles for editor customization matching premium industrial brand theme */}
      <style jsx global>{`
        .ql-container.ql-snow {
          border-bottom-left-radius: 0.125rem;
          border-bottom-right-radius: 0.125rem;
          min-height: 180px;
          font-size: 13px;
          font-family: inherit;
        }
        .ql-toolbar.ql-snow {
          border-top-left-radius: 0.125rem;
          border-top-right-radius: 0.125rem;
          background-color: #fcfcfc;
          border-color: var(--color-surface-variant);
        }
        .ql-snow .ql-stroke {
          stroke: #1a1a1a;
        }
        .ql-snow .ql-fill {
          fill: #1a1a1a;
        }
        .ql-snow .ql-picker {
          color: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
