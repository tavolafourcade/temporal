import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface LeadContextType {
  leadProfileOpen: boolean;
  setLeadProfileOpen: Dispatch<SetStateAction<boolean>>;
  handleLeadProfileOpen: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [leadProfileOpen, setLeadProfileOpen] = useState(false);

  const handleLeadProfileOpen = () => {
    setLeadProfileOpen(!leadProfileOpen);
  };

  return (
    <LeadContext.Provider
      value={{
        leadProfileOpen,
        setLeadProfileOpen,
        handleLeadProfileOpen,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadContext = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error(
      "useLeadContext must be within an LeadContextProvider context",
    );
  }
  return context;
};
