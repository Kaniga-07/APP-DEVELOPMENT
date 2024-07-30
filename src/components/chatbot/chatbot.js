import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: 'Hi! How can I assist you today?', type: 'bot' }]);
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const chatbotData = [
    { question: "hi", reply: "Hello! How can I help you today?" },
    { question: "bye", reply: "Goodbye! Have a great day!" },
    { question: "Hi! How can I assist you today", reply: "Hello! I need help with my account." },
    { question: "Can I change my password", reply: "Sure! You can reset your password by clicking on 'Settings'." },
    { question: "What is your return policy", reply: "Our return policy allows returns within 30 days of purchase. Items must be in original condition." },
    { question: "How do I track my order", reply: "You can track your order by clicking on the 'Track Order' link in your order confirmation email." },
    { question: "Do you offer customer support", reply: "Yes, we offer 24/7 customer support. You can reach us via phone, email, or live chat." },
    { question: "Where are you located", reply: "We are located at 123 Main Street, Anytown, USA." },
    { question: "What payment methods do you accept", reply: "We accept Visa, MasterCard, American Express, Discover, and PayPal." },
    { question: "Can I change my order after it's been placed", reply: "Unfortunately, we cannot change orders once they have been placed. Please contact support for further assistance." },
    {question: "How do I apply a discount code", reply: "You can apply a discount code at checkout. Enter the code in the 'Promo Code' field and click 'Apply'." },
    { question: "Do you ship internationally", reply: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location." },
    { question: "What is your privacy policy", reply: "Our privacy policy can be found on our website under 'Privacy Policy'. It explains how we collect, use, and protect your information." },
    { question: "How do I contact customer service", reply: "You can contact customer service by phone at 1-800-123-4567, by email at support@example.com, or via live chat on our website." },
    { question: "Can I cancel my order", reply: "If your order has not yet shipped, you can cancel it by contacting customer service. If it has shipped, you will need to process a return." },
    { question: "How long does shipping take", reply: "Shipping times vary by location. Standard shipping within the US typically takes 3-5 business days." },
    { question: "What is your exchange policy", reply: "You can exchange items within 30 days of purchase. Items must be in original condition." },
    { question: "Do you have a loyalty program", reply: "Yes, we have a loyalty program. You can sign up on our website to start earning points on your purchases." },
    { question: "Can I return items", reply: "Yes, items purchased on sale can be returned within 30 days, as long as they are in original condition." },
    { question: "How do I update my account information", reply: "You can update your account information by logging into your account and going to the 'Account Settings' page." },
    { question: "What if my order is damaged", reply: "If your order arrives damaged, please contact customer service immediately for assistance." },
    { question: "Do you offer gift cards", reply: "Yes, we offer gift cards in various denominations. They can be purchased on our website." }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, type: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000); // Simulate bot typing delay
    }
  };

  const normalizeText = (text) => {
    return text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').trim();
  };

  const getBotResponse = (input) => {
    const normalizedInput = normalizeText(input);
    const found = chatbotData.find(item =>
      normalizeText(item.question).includes(normalizedInput)
    );
    if (found) {
      return { text: found.reply, type: 'bot' };
    } else {
      return { text: "Sorry, I don't understand that question.", type: 'bot' };
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-icon" onClick={() => setIsChatOpen(!isChatOpen)}>
        🤖
      </button>

      {isChatOpen && (
        <div className="chatbot">
          <div className="chat-window">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <em>Bot is typing...</em>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-section">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
