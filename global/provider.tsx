'use client';
import {createContext,  ReactNode,  useContext, useEffect, useReducer} from 'react';
import { Country } from '@app/page';

type GlobalState = {
globalCountries: Country[],

}
type Action =
  | { type: "ADD_COUNTRY"; payload: Country }
  | { type: "REMOVE_COUNTRY"; payload: string };

  const initialState: GlobalState = {
    globalCountries: [],
  };

  function globalReducer(state: GlobalState, action: Action): GlobalState {
    switch (action.type) {
      case "ADD_COUNTRY":
        console.log("Country added to global state:", action.payload + " after payload");
        console.log('hello')
        return {
          ...state,
          globalCountries: [...state.globalCountries, action.payload],
        };
      case "REMOVE_COUNTRY":
        return {
          ...state,
          globalCountries: state.globalCountries.filter(
            (c) => c.name.common !== action.payload
          ),
        };
      default:
        return state;
    }
  }

  interface GlobalContextType {
    state: GlobalState;
    dispatch: React.Dispatch<Action>;
  }
  const GlobalContext = createContext<GlobalContextType>({
    state: initialState,
    dispatch: () => null,
  });

  export const GlobalProvider = ({ children } : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        console.log("Global state updated:", state);
      }, [state]);
  
    return (
      <GlobalContext.Provider value={{ state, dispatch }}>
        {children}
      </GlobalContext.Provider>
    );
  };
  export const useGlobalContext = () => useContext(GlobalContext);


