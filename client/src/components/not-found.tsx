import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <Container>
                <br />
                <h1>404 Not Found</h1>
                <Link to='/'>To Home</Link>
            </Container>
        )
    }
}
export default NotFound