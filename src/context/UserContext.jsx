import React , { createContext, useReducer } from 'react';

export const UserContext = createContext("");
const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_DATA': 
      return { ...state, ...action.payload };
    case 'DELETE_DATA':
      return initialState
    default:
      return state;
  }
}

export const UserProvider = props => {

  const[state, dispatch] = useReducer(reducer, initialState);

  return( 
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider> 
    )

}