import React, { Component } from 'react'
import { Button, Card, CardText, CardTitle, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col sm="6">
                        <Card body>
                            <CardTitle tag="h5">
                                Dashbord
                            </CardTitle>
                            <CardText>
                                Go to manage stories.
                            </CardText>
                            <Button color='Link' onClick={() => {}}>
                                <Link to='/story/1'>
                                        Navigate
                                </Link>
                            </Button>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body>
                            <CardTitle tag="h5">
                                Timeline
                            </CardTitle>
                            <CardText>
                                Go to timeline.
                            </CardText>
                            <Button color='Link' onClick={() => {}}>
                                <Link to='/timeline/999'>
                                        Navigate
                                </Link>
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home