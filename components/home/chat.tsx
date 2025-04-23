import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<ChatProps> = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Real estate bot responses
  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
      return "RealtorBot: Hello! I'm your real estate assistant. How can I help you today? You can ask about properties, pricing, scheduling viewings, or our services.";
    } else if (lowerMsg.includes('property') || lowerMsg.includes('home') || lowerMsg.includes('house')) {
      return "RealtorBot: We have a wide selection of properties available. Could you specify:\n1. Preferred location\n2. Budget range\n3. Number of bedrooms\n4. Any special requirements?";
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return "RealtorBot: Property prices vary based on location, size, and features. Our current listings range from $250,000 to $2.5M. Would you like me to send you our current listings?";
    } else if (lowerMsg.includes('view') || lowerMsg.includes('tour') || lowerMsg.includes('visit')) {
      return "RealtorBot: I can help schedule a viewing! Please provide:\n1. Property address or ID\n2. Your preferred date/time\n3. Your contact information";
    } else if (lowerMsg.includes('agent') || lowerMsg.includes('realtor') || lowerMsg.includes('contact')) {
      return "RealtorBot: Our agents are available 7 days a week. You can reach us at (555) 123-4567 or email agents@premierrealty.com. Would you like me to connect you with an agent now?";
    } else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
      return "RealtorBot: We offer:\n1. Buying assistance\n2. Selling consultation\n3. Property valuation\n4. Rental management\n5. Investment advice\nWhich service are you interested in?";
    } else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
      return "RealtorBot: You're welcome! Is there anything else I can help you with today?";
    } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
      return "RealtorBot: Thank you for chatting! Feel free to reach out anytime. Have a great day!";
    } else {
      return "RealtorBot: I'm not sure I understand. Could you rephrase or ask about:\n- Properties\n- Pricing\n- Viewings\n- Our services\n- Contacting an agent";
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);

      // Get bot response
      const botReply = getBotResponse(message);

      // Simulate the bot's reply after a short delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 800);

      // Clear the input field after sending
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 z-50"
      >
        <MessageCircle className="h-6 w-6" />
        <span>Real Estate Help</span>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg w-80 flex flex-col z-50 max-h-[80vh]">
          {/* Chat Header with Close Button */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Premier Realty Chat
            </h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-gray-500 text-center py-8 flex flex-col items-center">
                <MessageCircle className="h-8 w-8 mb-2 text-blue-400" />
                <p>Welcome to Premier Realty!</p>
                <p className="text-sm mt-1">Ask about properties, pricing, or schedule a viewing.</p>
                <div className="mt-4 text-left w-full text-sm text-gray-600">
                  <p className="font-medium">Try asking:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>What properties do you have?</li>
                    <li>What's the price range?</li>
                    <li>How can I schedule a viewing?</li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${msg.startsWith('You:') ? 'bg-blue-100 text-blue-900 ml-8' : 'bg-gray-100 text-gray-900 mr-8'}`}
                >
                  {msg.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                  ))}
                </div>
              ))
            )}
          </div>
          
          {/* Input Area */}
          <div className="flex border-t pt-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about properties..."
              className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;