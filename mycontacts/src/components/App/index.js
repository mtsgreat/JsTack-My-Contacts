import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlovalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';
import Header from '../Header';
import Routes from '../../Routes';
// import ContactsList from '../ContactsList';

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
          <GlovalStyles />
          <Container>
            <Header />
            <Routes />
          </Container>
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
