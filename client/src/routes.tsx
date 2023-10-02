import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/dashboard'
import About from './components/about';
const IndexPage = () => {

    return <div>Welcome to Scrum Master<br /><a href="/story/1">Homepage</a></div>
}
const NotFoundPage = () => {

    return <div><h2>Not Found</h2><br /><a href="/story/1">Homepage</a></div>
}
export default (
    <BrowserRouter>
        <Route path='/story/:id' component={App}/>
        <Route path='/about' component={About}/>
        <Route path="/" component={IndexPage} />
        <Route path='*' component={NotFoundPage}/>
    </BrowserRouter>
)