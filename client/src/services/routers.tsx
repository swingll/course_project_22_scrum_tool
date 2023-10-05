import * as React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import About from '../components/about';
import Dashboard from '../components/dashboard';
import AuthPath from '../components/auth';
import Timeline from '../components/timeline';
import { useAxios } from './api';
import { useSignedIn } from '../states/user/hooks';
import Loader from '../components/loader';

function Routers() {
  // initial api
  useAxios();

  // const logged = useSignedIn();
  const logged = true;

  const IndexPage = () => {
    return <div>Welcome to Scrum Master<br /><a href="/story/1">Homepage</a></div>
  }

  const NotFoundPage = () => {
    return <div><h2>Not Found</h2><br /><a href="/">Homepage</a></div>
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={logged ? <IndexPage /> : <AuthPath />} />

          <Route path='/timeline' element={logged ? <Timeline /> : <AuthPath />}/>
          <Route path='/story/:id' element={logged ? <Dashboard /> : <AuthPath />} />
          <Route path='/about' element={<About />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default Routers;