import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from 'react-simple-chatbot';
import { renderToString } from "react-dom/server";
import { SiBilibili } from "react-icons/si";
import { SlArrowRight } from "react-icons/sl";
import { ThemeProvider } from "styled-components";
import "./GoodDayCB.css";
import CBsteps from "./CBsteps";

const cbIcon = <SiBilibili/>;
const Stringicon = renderToString(cbIcon);
const cbIconUrl =  `data:image/svg+xml;base64,${btoa(Stringicon)}`;

const GoodDayCB = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const handleIconClick = () => {
    setShowChatBot(true);
  };

  const handleChatBotClose = () => {
    setShowChatBot(false);
  };
  
  const ChatBotHeader = (
    <div className="CB-header">
      <h2 className="CB-header-title">Good Day ChatBot</h2>
      <div className="CB-close-button">
        <span className="CB-close-icon" onClick={handleChatBotClose}>
          <SlArrowRight/>
        </span>
      </div>
    </div>
  );


  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#2f855a',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: 'linear-gradient(to right, #8bc34a, #4caf50)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
  
  const avatarStyle = {
    padding:'auto',
    height: '30px',
    width: '30px',
  }


  return (
    <div className="CB-wrapper">
      {!showChatBot && (
        <div className="CB-button" onClick={handleIconClick}>
          <span className="CB-icon">
            <SiBilibili />
          </span>
        </div>
      )}
      <AnimatePresence>
        {showChatBot && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2}}
            className="CB-chatbot"
          >
            <ThemeProvider theme={theme}>
              {ChatBotHeader}
              <div className="CB-chatbot-content">
                <ChatBot
                  hideHeader={true}
                  hideUserAvatar={true}
                  enableSmoothScroll={true}
                  botAvatar={cbIconUrl}
                  avatarStyle={avatarStyle}
                  placeholder={"문의 사항을 말씀 해주세요."}
                  contentStyle={{ height: 'calc(100% - 60px)'}}
                  steps={CBsteps}
                  handleEnd={handleChatBotClose}
                />
              </div>
            </ThemeProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoodDayCB;