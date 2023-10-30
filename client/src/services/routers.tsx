import * as React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import About from '../components/about';
import Dashboard from '../components/dashboard';
import AuthPath from '../components/auth';
import Timeline from '../components/timeline';
import { useAxios } from './api';
import { useSignedIn } from '../states/user/hooks';
import Loader from '../components/loader';
import Home from '../components/home';
import NotFound from '../components/not-found';

function Routers() {
  // initial api
  useAxios();

  const logged = useSignedIn();

  const IndexPage = () => {
    return <Home />
  }

  const NotFoundPage = () => {
    return <NotFound />
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={logged ? <IndexPage /> : <AuthPath />} />          
          <Route path='/story/:id' element={logged ? <Dashboard /> : <AuthPath />} />
          <Route path='/timeline/:id' element={logged ? <Timeline /> : <AuthPath />}/>
          <Route path='/about' element={<About />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default Routers;