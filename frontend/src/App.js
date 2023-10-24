import React from 'react'
import './App.css'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// MUI Imports
import { StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// Components
import Home from './Components/Home'
import Header from './Components/Header'
import Login from './Components/Login'
import Listings from './Components/Listings'
import Testing from './Components/Testing'
import Register from './Components/Register'
import ReducerTest from './Components/ReducerTest'
import ResponsiveAppBar from './Components/ResponsiveAppbar'

// Contexts
import DispatchContext from './Contexts/DispatchContext'
import StateContext from './Contexts/StateContext'


function App() {

  const initialState = {
    userUsername: '',
    userEmail: '',
    userId: '',
    userToken: '',
    globalMessage: 'Hello, this message can be used by any child component'
  }

  function ReducerFunction(draft, action) {
      switch(action.type) {
        case 'catchToken':
          draft.userToken = action.tokenValue
          break
        case 'catchUserInfo':
          draft.userUsername = action.usernameInfo,
          draft.userEmail = action.emailInfo,
          draft.userId = action.IdInfo
          break
      }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


  return (
    <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      <StyledEngineProvider injectFirst>
      <BrowserRouter>
      <CssBaseline />
      <Header/>
      <ResponsiveAppBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/listings' element={<Listings/>}/>
          <Route path='/testing' element={<Testing/>}/>
          <Route path='/reducer' element={<ReducerTest/>}/>
          {/* <Route path='/responsivebar' element={<ResponsiveAppBar/>}/> */}
        </Routes>
      </BrowserRouter>
      </StyledEngineProvider>
    </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
