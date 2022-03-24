import React from 'react';
import '../../App.css';
import { Stack, Container, Row, Col } from 'react-bootstrap';
import pelosi from "../images/pelosi.jpg"
import pie from "../images/Pie.jpg"
import line from "../images/line.png"

const Homepage = () => {
    return (
    <>
    <Container>
    <h1 className='topmoverheader'>Top Mover</h1>
    <Row className='topmover-container'>
            <Col lg={3} md={6} sm={6}>
                <img className="topmover-pic" src={pelosi} alt="pelosi"/>
                <div className="topmover-info">
                <h3>Speaker of the House</h3>
                <h2>Pelosi</h2>
                </div>
            </Col>
            <Col lg={3} md={6} sm={6}><img className="topmoverpie-pic" src={pie} alt="piechart"/></Col>
            <Col lg={6} md={12} sm={12}><img className="topmoverline-pic" src={line} alt="linegraph"/></Col>
    </Row>
    </Container>
    <Container>
    <Row className='recent-container'>
            <h1 className='recentheader'>Recent Transactions</h1>
            <Col className="recent-transaction" lg={7} md={12} sm={12}>sm=true</Col>
            <Col className="homepage-graph" lg={5} md={12} sm={12}><img className="topmoverline-pic" src={line} alt="linegraph"/></Col>
    </Row>
    </Container>
    </>
    );
  };

export default Homepage;
