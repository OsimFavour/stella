import React from 'react'
import './App.css'
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


function App() {
  return (
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
    <CssBaseline />
    {/* <Header/> */}
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
  );
}

export default App;
