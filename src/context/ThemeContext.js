import { createContext, useContext, useReducer } from 'react'
import { ThemeReducer } from '../reducers'
const ThemeContext = createContext(['light', () => {}])
const initialState = {
  themeMode: 'dark'
}
const ThemeProvider = ({ children }) => {
  const [themeState, themeDispatch] = useReducer(ThemeReducer, initialState)
  return (
    <ThemeContext.Provider value={{ themeState, themeDispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)
export { ThemeProvider, useTheme }