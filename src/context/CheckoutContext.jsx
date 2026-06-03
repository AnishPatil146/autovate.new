import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/ui/CheckoutModal';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [bot, setBot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const triggerCheckout = (botToBuy) => {
    setBot(botToBuy);
    setIsOpen(true);
  };

  const handleConfirm = (purchasedBot, email, utr) => {
    setIsOpen(false);
    navigate(`/thank-you?bot=${encodeURIComponent(purchasedBot.name)}&price=${purchasedBot.price}&email=${encodeURIComponent(email)}&utr=${encodeURIComponent(utr)}`);
  };

  return (
    <CheckoutContext.Provider value={{ triggerCheckout }}>
      {children}
      <CheckoutModal
        bot={bot}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
