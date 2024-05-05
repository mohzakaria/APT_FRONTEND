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

    // function setHTML(html) {
    //   q.root.innerHTML = html;
    // }

    // Function to convert HTML to Delta object
    function htmlToDelta(html) {
      // Create a temporary div element to hold the HTML content
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // Initialize an array to store Delta operations
      var deltaOps = [];

      // Iterate over child nodes of the temporary div
      for (var i = 0; i < tempDiv.childNodes.length; i++) {
        var node = tempDiv.childNodes[i];

        // Process text nodes
        if (node.nodeType === Node.TEXT_NODE) {
          deltaOps.push({ insert: node.textContent });
        }

        // Process element nodes
        else if (node.nodeType === Node.ELEMENT_NODE) {
          // Check for strong (bold) and em (italic) tags
          if (node.tagName.toLowerCase() === 'strong') {
            deltaOps.push({ insert: node.textContent, attributes: { bold: true } });
          } else if (node.tagName.toLowerCase() === 'em') {
            deltaOps.push({ insert: node.textContent, attributes: { italic: true } });
          }
        }

        // Add a newline character after each node (optional)
        deltaOps.push({ insert: '\n' });
      }

      // Return the Delta object
      return { ops: deltaOps };
    }

    // Convert HTML content to Delta object
    console.log(content);
    var htmlContent = atob(content);
    console.log(htmlContent);
    var delta = htmlToDelta(htmlContent);

    // Set Delta object as contents of Quill editor
    //q.setContents(delta);
    //console.log(delta);
    //q.setContents(atob(content));
    q.setText(atob(content));
    //console.log(atob(content)) // set the document content in the Quill editor

    q.on('text-change', (delta, oldDelta, source) => {
      let insert = '', retain, deleteLength;
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
      //console.log(id, retain, deleteLength)

      if (deleteLength) {
        fetch("http://localhost:8085/deleteFromDocument",
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
            console.log(id, retain, deleteLength)
            console.error('Error:', error);
          });
      }

      if (insert) {
        const deltaBase64 = btoa(insert);
        //console.log(deltaBase64);


        fetch("http://localhost:8085/insertInDocument",
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
              //console.log(insert)
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
    fetch(`http://localhost:8085/document/${id}`)
      .then(response => response.json())
      .then(data => setContent(data.content));
    console.log(content);
  }, [id]);



  return (
    <div id="TextEditor" className="document" ref={wrapperRef}>
    </div>
  );
}