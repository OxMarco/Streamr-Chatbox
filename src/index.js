import React, { useEffect, useState } from "react";
import StreamrClient from "streamr-client";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import RelativeTime from "@yaireo/relative-time";
import Wallet from "./components/Wallet";
import "./Chatbox.scss";
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

function Chatbox({ theme, provider, address, streamID, DEBUG = true }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [client, setClient] = useState();

  useEffect(() => {
    const subscribeToStream = async () => {
      const stream = new StreamrClient({
        auth: {
          ethereum: window.ethereum, // TODO use injectedProvider
        },
      });

      setClient(stream);

      if (DEBUG) console.log("Subscribing...");

      await stream.subscribe(
        {
          stream: streamID,
        },
        (message, metadata) => {
          console.log("message received", metadata);

          var cleanText = DOMPurify.sanitize(message.msg);
          const from = metadata.messageId.publisherId;
          const relativeTime = new RelativeTime();
          const time = relativeTime.from(
            new Date(metadata.messageId.timestamp)
          );

          const msg = {
            type: from === address ? true : false,
            from: from,
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

  const [panel, setPanel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [open, setOpen] = useState(true);
  const [close, setClose] = useState(false);
  const [max, setMax] = useState(false);

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
    if (DEBUG) console.log("Publishing message: " + text);
    const message = {
      msg: text,
    };

    await client.publish(streamID, message);

    setText("");

    if (DEBUG) console.log("message sent");
  };

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

  return (
    <ChatboxBase>
      <ChatboxOpen onClick={handleOpen} open={open}>
        <i className="fa fa-comment fa-2x" aria-hidden="true"></i>
      </ChatboxOpen>
      <ChatboxClose onClick={handleClose} open={close}>
        <i className="fa fa-times fa-2x" aria-hidden="true"></i>
      </ChatboxClose>
      <ChatboxPopup open={popup}>
        <ChatboxPopupHeader>
          <aside style={{ flex: 3 }}>
            <i
              className="fa fa-user-circle fa-4x"
              aria-hidden="true"
              style={{
                marginTop: "-32px",
                backgroundColor: "#0360a5",
                border: "5px solid rgba(0,0,0,0.1)",
                borderRadius: "50%",
              }}
            ></i>
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
              <i className="fa fa-window-maximize" aria-hidden="true"></i>
            </Button>
          </aside>
        </ChatboxPopupHeader>

        <ChatboxPopupMain>
          <ChatBoxPopupHistory>
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
            <i
              className="fa fa-paper-plane"
              aria-hidden="true"
              onClick={handleSubmit}
            ></i>
          </aside>
        </PopupFooter>
      </ChatboxPopup>

      <ChatboxPanel open={panel}>
        <PanelHeader>
          <aside style={{ flex: 3 }}>
            <i
              className="fa fa-user-circle fa-3x"
              aria-hidden="true"
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
            ></i>
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
              <i className="fa fa-window-restore" aria-hidden="true"></i>
            </Button>
            <Button onClick={handleClosePanel}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </Button>
          </aside>
        </PanelHeader>
        <PanelMain style={{ flex: 1 }}>
          <PanelHistory>
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
            <i
              className="fa fa-paper-plane"
              aria-hidden="true"
              onClick={handleSubmit}
            ></i>
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
