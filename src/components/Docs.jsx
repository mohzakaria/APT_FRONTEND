/*eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import NavBarDoc from './NavBarDoc.jsx';
import { useParams } from 'react-router-dom'; // import useParams from react-router-dom
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useRef } from 'react';


const TOOLBAR_OPTIONS = [
  ["bold", "italic"],
  ["custom-button"], // Add your custom button here\

];

export function Docs() {
  const { id } = useParams();
  const [content, setContent] = useState('TE9BRElORy4uLi4=');
  const [title, settitle] = useState('');

  const type = localStorage.getItem('type');
  const [stompClient, setStompClient] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [firstTime, setFirstTime] = useState(0);
  const [index, setIndex] = useState(0);
  // const [elements, setElements] = useState([]);
  var newMessage = 0;
  let elements = useRef([]);
  let cursorindex=useRef(0);


  useEffect(() => {
    const socket = new SockJS('http://98.66.168.16/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      let subscription = client.subscribe(`/topic/document`, (payload) => {
        
        const messageBody = JSON.parse(payload.body);
        const comparator =elements.current[cursorindex.current] ['id']
        console.log("comparator: ", comparator);

        elements.current = (messageBody.elements);
        

        const index = elements.current.findIndex(element => element.id === comparator);
        console.log("Index: ", index);

        // Concatenate the 'value' properties of the elements
        const concatenatedValues = elements.current.map(element => element.value).join('');
        console.log("Concatenated values: ", concatenatedValues);
        console.log("Cursor Index: ", cursorindex.current);
        
        if(index>cursorindex.current)
          {
        cursorindex.current++;}
       

        setContent(concatenatedValues);

      });
    });
    setStompClient(client);
    return () => {
      client.disconnect();
    };
  }, []);


  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
      readOnly: type == "viewer" ? true : false,
      
    });

    const customButton = document.querySelector('.ql-custom-button'); // Adjust selector as needed
    if (customButton) {
      customButton.addEventListener('click', () => {
        window.location.href = '/your-target-page'; // Replace with your target page URL
      });
    }

   

    // Function to convert HTML to Delta object
    function htmlToDelta(html) {
      // Create a temporary div element to hold the HTML content
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      console.log(html);

      // Initialize an array to store Delta operations
      var deltaOps = [];

      // Process child nodes of the temporary div
      for (var i = 0; i < tempDiv.childNodes.length; i++) {
        var node = tempDiv.childNodes[i];

        // Process text nodes and element nodes
        if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
          // Extract text content and formatting attributes from the node
          var textContent = '';
          var attributes = {};

          if (node.nodeType === Node.TEXT_NODE) {
            textContent = node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Check for formatting tags (strong, em) and extract text content
            if (node.tagName.toLowerCase() === 'strong') {
              textContent = node.textContent;
              attributes.bold = true;
            } else if (node.tagName.toLowerCase() === 'em') {
              textContent = node.textContent;
              attributes.italic = true;
            }
          }

          // Add text content and formatting attributes to Delta object
          deltaOps.push({ insert: textContent, attributes: attributes });
          console.log(textContent);
          console.log(attributes);
        }


      }

      // Return the Delta object
      return { ops: deltaOps };
    }

    // Convert HTML content to Delta object
    console.log("sakdksadkasjd", firstTime);


    // console.log(content);
    if (firstTime == 0) {
      // var htmlContent = atob(content);
      // // console.log(htmlContent);
      // var delta = htmlToDelta(htmlContent);

      // Set Delta object as contents of Quill editor
      q.setText(content);
      // console.log(delta);
      console.log(firstTime);
    }
    // console.log("sdkald",newContent);
   
    q.insertText(index, newContent);
    q.setSelection(cursorindex.current, 0);
    


    //q.setContents(atob(content));
    //q.setText(atob(content));
    //console.log(atob(content)) // set the document content in the Quill editor
    q.on('text-change', (delta, oldDelta, source) => {
      let insert = '', retain, deleteLength;
      for (let op of delta.ops) {
        if (op.insert && op.attributes) {
          if (op.attributes.bold) {
            insert = '<strong>' + op.insert + '</strong>'
          }
          if (op.attributes.italic) {
            insert = '<em>' + op.insert + '</em>'
          }
          // console.log(delta);
          // console.log(oldDelta);
        }
        else if (op.insert) {
          insert = op.insert
          //console.log(op.retain);
          // console.log(delta);
          // console.log(oldDelta);
        }
        if (op.retain) {
          retain = op.retain;
          cursorindex.current = op.retain
          if(op.insert)
          {cursorindex.current++;}
          
        }
        if (op.delete) {
          deleteLength = op.delete;
          cursorindex.current--;
          // console.log(deleteLength);
          // console.log(delta);
          // console.log(oldDelta);

        }
      }  //console.log(id, retain, deleteLength)

      if (deleteLength) {
        let cumulativeLength = 0;
        let chCount = 0;
        let remainRetain = retain;
        let delLength = 0;
        let finalIndex = 0;
        if (oldDelta && oldDelta.ops) {
          // Iterate through each operation in the oldDelta
          for (let oldOp of oldDelta.ops) {

            // Check if the operation has insert and attributes (formatting)
            if (oldOp.insert && oldOp.attributes) {
              let formattedChars = ''; // Store the formatted characters for this operation

              // Apply formatting based on attributes
              if (oldOp.attributes.bold && oldOp.attributes.italic) {
                formattedChars = '<strong><em>' + oldOp.insert + '</em></strong>';
                delLength = 27;
              } else if (oldOp.attributes.bold) {
                formattedChars = '<strong>' + oldOp.insert + '</strong>';
                delLength = 18;
              } else if (oldOp.attributes.italic) {
                formattedChars = '<em>' + oldOp.insert + '</em>';
                delLength = 10;
              } else {
                formattedChars = oldOp.insert; // No formatting
              }
              if (remainRetain == 0) {
                break;
              }


              if (oldOp.insert.length >= remainRetain) {
                // console.log(cumulativeLength);
                cumulativeLength += (formattedChars.length - oldOp.insert.length + 1) * remainRetain;
                // console.log(formattedChars.length);
                // console.log(cumulativeLength);
                // console.log(remainRetain);
                if (oldOp.insert.length > remainRetain) {
                  finalIndex = cumulativeLength;
                  break;
                }
              }
              else {
                // Add the length of formattedChars to the cumulative length
                // console.log(cumulativeLength);
                cumulativeLength += (formattedChars.length - oldOp.insert.length + 1) * oldOp.insert.length;
                // console.log(formattedChars.length);
                // console.log(cumulativeLength);
              }


            }
            else if (oldOp.insert) {
              delLength = 1;
              if (oldOp.insert.length >= remainRetain) {
                cumulativeLength += remainRetain;
                if (oldOp.insert.length > remainRetain) {
                  finalIndex = cumulativeLength;
                  break;
                }
              }
              else {
                cumulativeLength += oldOp.insert.length;
              }

            }
            chCount += oldOp.insert.length;
            // console.log(remainRetain);
            remainRetain -= oldOp.insert.length;
            //console.log(cumulativeLength);
            if (remainRetain == 0) {
              finalIndex = cumulativeLength;
            }

          }
        }
        console.log(finalIndex);
        console.log(delLength);
        


        var operation = {
          documentId: id,
          index: elements.current[retain]['id'],
          newContent: "",
          isBold: false,
          isItalic: false // replace with your italic status
        };
        stompClient.send(`/app/deleteOpertionInDocument`, {}, JSON.stringify(operation));

      }

      if (insert) {
        let cumulativeLength = 0; // Cumulative length of characters in oldDelta
        if (retain) {
          let chCount = 0;
          let remainRetain = retain;
          if (oldDelta && oldDelta.ops) {
            // Iterate through each operation in the oldDelta
            for (let oldOp of oldDelta.ops) {

              // Check if the operation has insert and attributes (formatting)
              if (oldOp.insert && oldOp.attributes) {
                let formattedChars = ''; // Store the formatted characters for this operation

                // Apply formatting based on attributes
                if (oldOp.attributes.bold && oldOp.attributes.italic) {
                  formattedChars = '<strong><em>' + oldOp.insert + '</em></strong>';
                } else if (oldOp.attributes.bold) {
                  formattedChars = '<strong>' + oldOp.insert + '</strong>';
                } else if (oldOp.attributes.italic) {
                  formattedChars = '<em>' + oldOp.insert + '</em>';
                } else {
                  formattedChars = oldOp.insert; // No formatting
                }

                if (oldOp.insert.length >= remainRetain) {
                  console.log(cumulativeLength);
                  cumulativeLength += (formattedChars.length - oldOp.insert.length + 1) * remainRetain;
                  console.log(formattedChars.length);
                  console.log(cumulativeLength);
                  console.log(remainRetain);
                  break;
                }
                else {
                  // Add the length of formattedChars to the cumulative length
                  console.log(cumulativeLength);
                  cumulativeLength += (formattedChars.length - oldOp.insert.length + 1) * oldOp.insert.length;
                  console.log(formattedChars.length);
                  console.log(cumulativeLength);
                }


              }
              else if (oldOp.insert) {
                if (oldOp.insert.length >= remainRetain) {
                  console.log("here");
                  console.log(remainRetain);
                  cumulativeLength += remainRetain;
                  if (oldOp.insert.length > remainRetain) {
                    break;
                  }
                }
                else {
                  cumulativeLength += oldOp.insert.length;
                }

              }
              chCount += oldOp.insert.length;
              console.log(remainRetain);
              remainRetain -= oldOp.insert.length;
              //console.log(cumulativeLength);
              if (remainRetain == 0) {
                break;
              }
            }
          }
        }

        console.log(cumulativeLength);
        const deltaBase64 = btoa(insert);
        console.log("dfadsafsdafdsafasdfsadfasdfasdfsadfsdafsdasfsadfasdfsadfsdafdsafsdafsdaffasdfdsafsdfasfsadfsdafsdafsda", elements.current);
        var operation = {
          documentId: id,
          index: elements.current[retain - 1]['id'],
          newContent: insert,
          isBold: false,
          isItalic: false // replace with your italic status
        };
        stompClient.send(`/app/insertOpertionInDocument`, {}, JSON.stringify(operation));

      }
    });

  }, [content, id]); // add content and id to the dependency array

  useEffect(() => {
    // fetch the document content when the component mounts
    fetch(`http://98.66.168.16/document/${id}`)
      .then(response => response.text())
      .then(data => {
        console.log("lllllllllll")
        console.log(data);
        const con = JSON.parse(data);
        elements.current = (con.elements);


        // Concatenate the 'value' properties of the elements
        const concatenatedValues = elements.current.map(element => element.value).join('');
        console.log("Concatenatedsadoasldjasldlkaldkd values: ", concatenatedValues);

        setContent(concatenatedValues);
        // setContent(data)
        // settitle(data.title)
      });

    console.log(content);
  }, [id]);



  return (
    <div>
      {(type &&
        <>
          {type == "owner" && <NavBarDoc docName={title} id={id} className="info navnar print-hide" />}
          <div id="TextEditor" className="document" ref={wrapperRef} >
          </div> </>) || <>
          <NavBarDoc docName="This Document You dont have any permission" id={id} className="info navnar print-hide" />
        </>}
    </div>
  );
}