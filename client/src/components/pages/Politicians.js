import React from 'react';
import '../../App.css';
import { Stack, Container, Row, Col } from 'react-bootstrap';
import placeholder from "../images/placeholder.jpg"
import Cards from "../Cards"

const Politicians = () => {
    return (
    <>
    <div className="grid">
    <Container>
        <Row>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col><Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
            <Col lg={2} md={3} sm={6}>
                <Cards/>
            </Col>
        </Row>
    </Container>
    </div>
    </>
    );
  };

export default Politicians;
