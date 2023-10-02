import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../components/about';
import Dashboard from '../components/dashboard';

function Router() {
  // TODO: initial API
  // useApi();

  // const [fetchDashboard] = useFetchDashboard(false);

  // const logged = useLoggedIn();


  // React.useEffect(() => {
  //   ping().then((res) => {
  //     if (!res || !logged) return;
  //     batch(() => {
  //       fetchTypes();
  //     })
  //   });  
  // }, [logged]);

  // const props = { logged, collapsed };

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
          <Route path='/' element={<IndexPage />} />

          <Route path='/story/:id' element={<Dashboard />} />
          <Route path='/about' element={<About />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default Router;