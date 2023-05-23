import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import ShowList from './components/ShowDataList/Show-List';
import AppFooter from './components/Header-Footer/App-Footer';
import AppHeader from './components/Header-Footer/App-Header';

function App() {
  return (
    <>
    <AppHeader/>
      <Container>
        <Routes>
          <Route path="/" element={<ShowList />}></Route>
        </Routes>
      </Container>
    <AppFooter/>
    </>
  );
}

export default App;
