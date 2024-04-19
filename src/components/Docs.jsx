/*eslint-disable */
import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback,useState } from "react";
const TOOLBAR_OPTIONS = [
    ["bold", "italic"],
  ]
export function Docs() {
    const [quill, setQuill] = useState()
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
    
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
      }, [])
    //
    return (
        <div id="TextEditor" className="document" ref={wrapperRef}>
        </div>
    );
}