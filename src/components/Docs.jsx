/*eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom'; // import useParams from react-router-dom

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

    q.setContents(atob(content));
    q.setText(atob(content))
    console.log(atob(content)) // set the document content in the Quill editor

    q.on('text-change', (delta, oldDelta, source) => {
      let insert, retain, deleteLength;
      for (let op of delta.ops) {
        if (op.insert) {
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
              id: id, // use the id from the URL parameters
              index: retain,
              length: deleteLength
            }),
          }).then((response) => {
            if (response.ok) {
              // handle success
            } else {
              // handle error
            }
          }).catch((error) => {
            console.error('Error:', error);
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
              id: id, // use the id from the URL parameters
              index: retain
            }),
          }).then((response) => {
            if (response.ok) {
              // handle success
            } else {
              // handle error
            }
          }).catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }, [content, id]); // add content and id to the dependency array

  useEffect(() => {
    // fetch the document content when the component mounts
    fetch(`http://localhost:8080/document/${id}`)
      .then(response => response.json())
      .then(data => setContent(data.content));
  }, [id]);

  return (
    <div id="TextEditor" className="document" ref={wrapperRef}>
    </div>
  );
}