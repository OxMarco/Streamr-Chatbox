import styled, { keyframes } from "styled-components";

const fadeinout = keyframes`
0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
`;

const display = keyframes`
0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
  `;

export const ChatboxBase = styled.div`
  word-wrap: break-word !important;
  font-family: "Lato", sans-serif;
`;

export const Button = styled.button`
  color: inherit;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  cursor: pointer;
`;

export const PanelMain = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: calc(2 * #{16px}) #{16px};
  line-height: calc(#{16px} + #{16px} / 2);
  color: #888;
  text-align: center;
  flex: 1 1 auto;
`;

export const PanelHistory = styled.div`
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 60vh;
`;

export const PanelFooter = styled.footer`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 16px;
  border-top: 1px solid #ddd;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 auto;
`;

export const ChatboxInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  height: calc(#{16px} + #{16px} / 2);
  padding: 0 calc(#{16px} / 2);
  font-family: inherit;
  font-size: 16px;
  line-height: calc(#{16px} + #{16px} / 2);
  color: #888;
  background-color: none;
  border: 0;
  outline: 0 !important;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: #888;
  }
`;

export const PanelHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 16px;
  color: #fff;
  background-color: #0360a5;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 auto;
`;

export const PopupFooter = styled.footer`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 16px;
  border-top: 1px solid #ddd;
  align-items: center;
  justify-content: space-around;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

export const ClearFix = styled.li`
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
`;

export const Message = styled.div`
  background: #86bb71;
  float: left;
  color: white;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 70%;
  position: relative;

  &:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #86bb71 !important;
    border-width: 10px;
    margin-left: -10px;
  }
`;

export const MessageSelf = styled.div`
  background: #94c2ed;
  float: right;
  color: white;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 70%;
  position: relative;

  &:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #86bb71;
    border-width: 10px;
    margin-left: -10px;
    border-bottom-color: #94c2ed;
    left: 93%;
  }
`;

export const MessageSelfData = styled.div`
  margin-bottom: 10px;
  text-align: right;
`;

export const MessageData = styled.div`
  margin-bottom: 10px;
  text-align: left;
`;

export const MsgList = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

export const ChatBoxPopupHistory = styled.div`
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 250px;
`;

export const ChatboxOpen = styled.button`
  color: inherit;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 52px;
  height: 52px;
  color: #fff;
  background-color: #0360a5;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.15);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  margin: 16px;
  ${({ open }) =>
    open
      ? `
      -webkit-animation: display .2s linear forwards;
      animation: display .2s linear forwards;
      display: block !important;
      `
      : `
    -webkit-animation: fadeinout .2s linear forwards;
      animation: fadeinout .2s linear forwards;
      display: none !important
`}
`;

export const ChatboxClose = styled.button`
  color: inherit;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 52px;
  height: 52px;
  color: #fff;
  background-color: #0360a5;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.15);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  margin: 16px 84px 16px 16px;
  ${({ open }) =>
    open
      ? `
      -webkit-animation: display .2s linear forwards;
      animation: display .2s linear forwards;
      display: block !important;
      `
      : `
    -webkit-animation: fadeinout .2s linear forwards;
      animation: fadeinout .2s linear forwards;
      display: none !important
`}
`;

export const ChatboxPopup = styled.section`
  display: flex;
  position: absolute;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  flex-direction: column;
  display: none;
  bottom: 84px;
  right: 16px;
  width: 377px;
  height: auto;
  background-color: #fff;
  border-radius: 16px;
  ${({ open }) =>
    open
      ? `
      -webkit-animation: display .2s linear forwards;
      animation: display .2s linear forwards;
      display: flex !important;
      `
      : `
    -webkit-animation: fadeinout .2s linear forwards;
      animation: fadeinout .2s linear forwards;
      display: none !important
`}
`;

export const ChatboxPanel = styled.section`
  display: flex;
  position: absolute;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  flex-direction: column;
  display: none;
  top: 0;
  right: 0;
  bottom: 0;
  width: 377px;
  background-color: #fff;
  ${({ open }) =>
    open
      ? `
      -webkit-animation: display .2s linear forwards;
      animation: display .2s linear forwards;
      display: flex !important;
      `
      : `
    -webkit-animation: fadeinout .2s linear forwards;
      animation: fadeinout .2s linear forwards;
      display: none !important
`}
`;

export const ChatboxPopupHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 16px;
  color: #fff;
  background-color: #0360a5;
  align-items: center;
  justify-content: space-around;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const ChatboxTitle = styled.h1`
  margin: 0;
  font-size: 16px;
  line-height: 1;
`;

export const ChatboxPopupMain = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: 32šx 16px;
  line-height: 24px;
  color: #888;
  text-align: center;
`;
