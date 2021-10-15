import React, { useEffect, useState } from "react";
import StreamrClient from "streamr-client";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import RelativeTime from "@yaireo/relative-time";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faTimes, faUserCircle, faWindowMaximize, faWindowRestore, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Wallet from "./components/Wallet";
import {
  ChatboxBase,
  ChatboxClose,
  ChatboxOpen,
  ChatboxPanel,
  ChatboxPopup,
  ChatboxPopupHeader,
  ChatboxTitle,
  ChatboxPopupMain,
  Button,
  ChatBoxPopupHistory,
  MsgList,
  ClearFix,
  MessageSelfData,
  MessageSelf,
  MessageData,
  Message,
  PopupFooter,
  ChatboxInput,
  PanelHeader,
  PanelMain,
  PanelHistory,
  PanelFooter,
} from "./style";

library.add(faComment, faTimes, faUserCircle, faWindowMaximize, faWindowRestore, faPaperPlane);

// theme is not used anywhere, matter of code practices but I usually omit such value
function Chatbox({ theme, provider, address, streamID, DEBUG = true }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [client, setClient] = useState();

  // do the setStates above useEffect, just to make the code easier to read
  const [panel, setPanel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [open, setOpen] = useState(true);
  const [close, setClose] = useState(false);
  const [max, setMax] = useState(false);

  // a side not, there are quite a lot of setStates in the component
  // perhaps just to make it easier to handle in future, it would better
  // be to introduce some machine state here (xState etc. ?)

  // not sure of the specifics of streams here, but dont we want to 
  // unsubscribe on unmount ? If so then return callback from useEffect
  // https://stackoverflow.com/questions/55020041/react-hooks-useeffect-cleanup-for-only-componentwillunmount
  useEffect(() => {
    const subscribeToStream = async () => {
      const stream = new StreamrClient({
        auth: {
          ethereum: window.ethereum, // TODO use injectedProvider
        },
      });

      setClient(stream);

      // please add brackets after if {}, will be less prone to errors
      // and following the best practices
      // btw do we want to do the console logs in external npm package ? 
      if (DEBUG) { 
        console.log("Subscribing...");
      }

      await stream.subscribe(
        {
          stream: streamID,
        },
        (message, metadata) => {
          console.log("message received", metadata);

          // const instead of var ! 
          const cleanText = DOMPurify.sanitize(message.msg);
          const from = metadata.messageId.publisherId;
          const relativeTime = new RelativeTime();
          const time = relativeTime.from(
            new Date(metadata.messageId.timestamp)
          );

          const msg = {
            self: from === address.toLowerCase() ? true : false,
            from, // not needed from: from 
            text: cleanText,
            when: time,
          };

          setMessages((messages) => [...messages, msg]);
        }
      );

      if (DEBUG) console.log("Subscribed");
    };
    subscribeToStream();
  }, [streamID, address]);

  // Handle popup events

  // Open = true &&

  const handleMaximise = () => {
    setMax(true);
    setPanel(true);
    /*
    let panel = document.querySelector(".chatbox-panel");
    panel.classList.remove("chatbox-hide");
    panel.classList.add("chatbox-show");*/
    // add display flex

    setPopup(false);
    /*
    let popup = document.querySelector(".chatbox-popup");
    popup.classList.remove("chatbox-show");
    popup.classList.add("chatbox-hide");*/

    setOpen(false);
    /*
    let buttonOpen = document.querySelector(".chatbox-open");
    buttonOpen.classList.remove("chatbox-show");
    buttonOpen.classList.add("chatbox-hide");*/

    setClose(false);
    /*
    let buttonClose = document.querySelector(".chatbox-close");
    buttonClose.classList.remove("chatbox-show");
    buttonClose.classList.add("chatbox-hide");*/
  };

  // Open = false &&

  const handleMinimise = () => {
    setMax(false);
    setPanel(false);
    /*
    let panel = document.querySelector(".chatbox-panel");
    panel.classList.remove("chatbox-show");
    panel.classList.add("chatbox-hide");*/

    // Passed
    setPopup(true);
    /*
    let popup = document.querySelector(".chatbox-popup");
    popup.classList.remove("chatbox-hide");
    popup.classList.add("chatbox-show");*/

    // ?
    setOpen(true);
    /*
    let buttonOpen = document.querySelector(".chatbox-open");
    buttonOpen.classList.remove("chatbox-hide");
    buttonOpen.classList.add("chatbox-show");*/

    // Passed
    setClose(true);
    /*
    let buttonClose = document.querySelector(".chatbox-close");
    buttonClose.classList.remove("chatbox-hide");
    buttonClose.classList.add("chatbox-show");*/

    // ?
  };

  // Open = false && Working

  const handleClosePanel = () => {
    setPanel(false);
    setOpen(true);

    /*
    let panel = document.querySelector(".chatbox-panel");
    panel.classList.remove("chatbox-show");
    panel.classList.add("chatbox-hide");

    let buttonOpen = document.querySelector(".chatbox-open");
    buttonOpen.classList.remove("chatbox-hide");
    buttonOpen.classList.add("chatbox-show");*/
  };

  // Open = false && Working

  const handleClose = () => {
    setPopup(false);
    setClose(false);

    /*
    let panel = document.querySelector(".chatbox-popup");
    panel.classList.remove("chatbox-show");
    panel.classList.add("chatbox-hide");

    let button = document.querySelector(".chatbox-close");
    button.classList.remove("chatbox-show");
    button.classList.add("chatbox-hide");*/
  };

  // Open = true && Working

  const handleOpen = () => {
    setPopup(true);
    setClose(true);

    /*
    let panel = document.querySelector(".chatbox-popup");
    panel.classList.remove("chatbox-hide");
    panel.classList.add("chatbox-show");

    let button = document.querySelector(".chatbox-close");
    button.classList.remove("chatbox-hide");
    button.classList.add("chatbox-show"); */
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {

    if (DEBUG) { 
      console.log("Publishing message: " + text);
    }
    const message = {
      msg: text,
    };

    await client.publish(streamID, message);

    setText("");

    if (DEBUG) {
      console.log("message sent");
    }
  };

  useEffect(() => {
    var element = document.getElementById("scroll");
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const listener = async (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        await handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
  // do we want to do that on every rerender ? if no the add [] as second 
  // argument in useEffect

  return (
    <ChatboxBase>
      <ChatboxOpen onClick={handleOpen} open={open}>
        <FontAwesomeIcon icon={['fa', 'comment']} size="2x" />
      </ChatboxOpen>
      <ChatboxClose onClick={handleClose} open={close}>
        <FontAwesomeIcon icon={['fa', 'times']} size="2x" />
      </ChatboxClose>
      <ChatboxPopup open={popup}>
        <ChatboxPopupHeader>
          <aside style={{ flex: 3 }}>
            <FontAwesomeIcon icon={['fa', 'user-circle']} size="4x" 
              aria-hidden="true"
              style={{
                marginTop: "-32px",
                backgroundColor: "#0360a5",
                border: "5px solid rgba(0,0,0,0.1)",
                borderRadius: "50%",
              }}
            />
          </aside>
          <aside style={{ flex: 8 }}>
            <ChatboxTitle>
              <small>Publishing as:</small>
              <br />
              <Wallet address={address} provider={provider} />
            </ChatboxTitle>
          </aside>
          <aside style={{ flex: 1 }}>
            <Button onClick={handleMaximise}>
              <FontAwesomeIcon icon={['fa', 'window-maximize']}/>
            </Button>
          </aside>
        </ChatboxPopupHeader>

        <ChatboxPopupMain>
          <ChatBoxPopupHistory id="scroll">
            <MsgList>
              {messages.length === 0 && (
                <div>
                  A fully decentralised chatbox <br /> powered by Streamr.
                </div>
              )}
              {messages.map((message, index) => (
                <ClearFix key={index}>
                  {message.self && (
                    <div>
                      <MessageSelfData>
                        <small>{message.when}</small>&nbsp;&nbsp;&nbsp;
                        <span>
                          <Wallet address={message.from} provider={provider} />
                        </span>
                      </MessageSelfData>
                      <MessageSelf>{message.text}</MessageSelf>
                    </div>
                  )}
                  {!message.self && (
                    <div>
                      <MessageData>
                        <span>
                          <Wallet address={message.from} provider={provider} />
                        </span>
                        &nbsp;&nbsp;&nbsp;<small>{message.when}</small>
                      </MessageData>
                      <Message>{message.text}</Message>
                    </div>
                  )}
                </ClearFix>
              ))}
            </MsgList>
          </ChatBoxPopupHistory>
        </ChatboxPopupMain>

        <PopupFooter>
          <aside style={{ flex: 10 }}>
            <ChatboxInput
              type="text"
              placeholder="Type your message here..."
              autoFocus
              onChange={handleChange}
              value={text}
            ></ChatboxInput>
          </aside>
          <aside style={{ flex: 1, color: "#888", textAlign: "center" }}>
            <FontAwesomeIcon icon={['fa', 'paper-plane']} onClick={handleSubmit} />
          </aside>
        </PopupFooter>
      </ChatboxPopup>

      <ChatboxPanel open={panel}>
        <PanelHeader>
          <aside style={{ flex: 3 }}>
          <FontAwesomeIcon icon={['fa', 'user-circle']} size="3x"
              style={
                max
                  ? {
                      marginTop: "0px",
                      backgroundColor: "#0360a5",
                      border: "5px solid rgba(0,0,0,0.1)",
                      borderRadius: "50%",
                    }
                  : {
                      marginTop: "-32px",
                      backgroundColor: "#0360a5",
                      border: "5px solid rgba(0,0,0,0.1)",
                      borderRadius: "50%",
                    }
              }
            />
          </aside>
          <aside style={{ flex: 6 }}>
            <ChatboxTitle>
              <small>Publishing as:</small>
              <br />
              <Wallet address={address} provider={provider} />
            </ChatboxTitle>
          </aside>
          <aside style={{ flex: 3, textAlign: "right" }}>
            <Button onClick={handleMinimise}>
              <FontAwesomeIcon icon={['fa', 'window-restore']} />
            </Button>
            <Button onClick={handleClosePanel}>
              <FontAwesomeIcon icon={['fa', 'times']} />
            </Button>
          </aside>
        </PanelHeader>
        <PanelMain style={{ flex: 1 }}>
          <PanelHistory>
            <MsgList id="scroll">
              {messages.length === 0 && (
                <div>
                  A fully decentralised chatbox <br /> powered by Streamr.
                </div>
              )}
              {messages.map((message, index) => (
                <ClearFix key={index}>
                  {message.self ? (
                    <div>
                      <MessageSelfData>
                        <small>{message.when}</small>&nbsp;&nbsp;&nbsp;
                        <span>
                          <Wallet address={message.from} provider={provider} />
                        </span>
                      </MessageSelfData>
                      <MessageSelf>{message.text}</MessageSelf>
                    </div> )
                  : (
                    <div>
                      <MessageData>
                        <span>
                          <Wallet address={message.from} provider={provider} />
                        </span>
                        &nbsp;&nbsp;&nbsp;<small>{message.when}</small>
                      </MessageData>
                      <Message>{message.text}</Message>
                    </div>
                  )}
                </ClearFix>
              ))}
            </MsgList>
          </PanelHistory>
        </PanelMain>
        <PanelFooter>
          <aside style={{ flex: 10 }}>
            <ChatboxInput
              type="text"
              placeholder="Type your message here..."
              autoFocus
              onChange={handleChange}
              value={text}
            ></ChatboxInput>
          </aside>
          <aside style={{ flex: 1, color: "#888", textAlign: "center" }}>
            <FontAwesomeIcon icon={['fa', 'paper-plane']} onClick={handleSubmit} />
          </aside>
        </PanelFooter>
      </ChatboxPanel>
    </ChatboxBase>
  );
}

Chatbox.propTypes = {
  theme: PropTypes.object,
  provider: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  streamID: PropTypes.string.isRequired,
  DEBUG: PropTypes.bool,
};

export default Chatbox;
