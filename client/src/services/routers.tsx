import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../components/about';
import Dashboard from '../components/dashboard';
import AuthPath from '../components/auth';
import { useAxios } from './api';
import { useSignedIn } from '../states/user/hooks';

function Router() {
  // initial api
  useAxios();

  const logged = useSignedIn();

  const IndexPage = () => {
    return <div>Welcome to Scrum Master<br /><a href="/story/1">Homepage</a></div>
  }

  const NotFoundPage = () => {
    return <div><h2>Not Found</h2><br /><a href="/story/1">Homepage</a></div>
  }

  return (
    <BrowserRouter>
      <React.Suspense> {/* fallback={<Spinner />}> */}
        <Routes>
          <Route path='/' element={logged ? <IndexPage /> : <AuthPath />} />

          <Route path='/story/:id' element={logged ? <Dashboard /> : <AuthPath />} />
          <Route path='/about' element={<About />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default Router;