/*eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom';

const TOOLBAR_OPTIONS = [
  ["bold", "italic"],
];

export function Docs() {
  const { id } = useParams();
  const [content, setContent] = useState(''); 

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.on('text-change', (delta, oldDelta, source) => {
      let insert='', retain, deleteLength;
      for (let op of delta.ops) {
        if (op.insert && op.attributes) {
          if(op.attributes.bold )
          {
            insert = '<strong>'+op.insert+'</strong>'
          }
          if(op.attributes.italic)
          {
            insert = '<em>'+op.insert+'</em>'
          }
        }
        else if (op.insert){
          insert = op.insert;
        }
        if (op.retain) {
          retain = op.retain;
        }
        if (op.delete) {
          deleteLength = op.delete;
        }
      }

      if (deleteLength) {
        fetch("http://localhost:8080/deleteFromDocument",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              index: retain,
              length: deleteLength
            }),
          });
      }

      if (insert) {
        const deltaBase64 = btoa(insert);

        fetch("http://localhost:8080/insertInDocument",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newContent: deltaBase64,
              id: id,
              index: retain
            }),
          });
      }
    });
  }, [content, id]);

  useEffect(() => {
    fetch(`http://localhost:8080/document/${id}`)
      .then(response => response.json())
      .then(data => {
        const decodedContent = atob(data.content);
        q.root.innerHTML = decodedContent;
      });
  }, [id]);

  return (
    <div id="TextEditor" className="document" ref={wrapperRef}>
 </div>
);
}
