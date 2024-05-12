import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ReactGA from "react-ga4";

import ToggleTheme from './components/ui/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import QuizTopicsScreen from './components/QuizTopicsScreen';
import QuizDetailsScreen from './components/QuizDetailsScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import SplashScreen from './components/SplashScreen';

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })
  const navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    console.log("=================================>", location.search)
    // ReactGA.event()
    ReactGA.send({ hitType: "pageview", page: `${location.pathname}${location.search}`, title: `${location.pathname}${location.search}` });
  }, [location]);

  useEffect(() => {
    ReactGA.initialize("G-YQFW1E59EF");
    setTimeout(() => {
      if (location.pathname == "/")
        navigate('/topic')
    }, 1000)
  }, [])

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentTheme(checked ? 'dark' : 'light')
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }

  const theme = currentTheme === 'light' ? themes.light : themes.dark;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QuizProvider>
        <ToggleTheme
          onChange={toggleTheme}
          currentTheme={currentTheme}
          checked={currentTheme === 'dark'}
          id="toggleTheme"
          value="theme"
        />
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/topic" element={<QuizTopicsScreen />} />
          <Route path="/detail-screen" element={<QuizDetailsScreen />} />
          <Route path="/quetion-screen" element={<QuestionScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        {/* <Main /> */}
      </QuizProvider>
    </ThemeProvider>
  )
}

export default App
