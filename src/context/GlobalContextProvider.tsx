import React, { createContext, useContext, useReducer } from 'react'

type ContextProps = {
  children: React.ReactNode
}

type InitialStateValues = {
  company_name: string;
  company_address: string;
  company_email: string;
  license: string;
  firstname: string;
  lastname: string;
  contact_number: string;
  subscription: string;
}

type ContextData = {
  data: InitialStateValues
  dispatch: React.Dispatch<Action>;
}

type Action = {
  type: 'ACTION_UPDATE',
  payload: Partial<InitialStateValues>
}

const initialState: InitialStateValues = {
  company_name: '',
  company_address: '',
  company_email: '',
  license: '',
  firstname: '',
  lastname: '',
  contact_number: '',
  subscription: '',
}

const reducer = (state:InitialStateValues, action: Action) => {
  switch(action.type){
    case 'ACTION_UPDATE':
      return {...state, ...action.payload}
  }
}

export const GlobalContext = createContext<ContextData | null>(null);

export const GlobalContextProvider = ({children}: ContextProps) => {

  const [data, dispatch] = useReducer(reducer, initialState);

  const contextValue: ContextData = {
    data,
    dispatch
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export default GlobalContextProvider