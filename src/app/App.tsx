import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {logoutTC} from "../features/login/authReducer";


function App() {
  const dispatch = useDispatch()
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  useEffect(()=> {
    dispatch(initializeAppTC())
  }, [])

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>

  }

  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Todolists table
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="loader">
        {(status === 'loading') && <LinearProgress color="secondary" />}
      </div>
      <Container fixed>
        <Routes>
          <Route path='/' element={<TodolistsList />}/>
          <Route path='login' element={<Login/>}/>
          <Route path='404' element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
          <Route path='*' element={<Navigate to="404"/>}/>
        </Routes>
      </Container>
      <ErrorSnackbar/>
    </div>
  )
}

export default App
