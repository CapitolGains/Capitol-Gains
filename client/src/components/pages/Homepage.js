import React from "react";
import { useParams, Link } from 'react-router-dom';
import { getPolitician } from '../politicians';
import lincoln from '../images/lincoln.jpg'

import '../../App.css';
import { Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import HomepageCard from "../HomepageCard";

export default function Homepage() {

    let params = useParams();

    let politician = getPolitician(parseInt(params.politicianId, 10));

    return (
    <>

    <style type="text/css">
    {`
    .btn-success {
      background-color: #699b2c ;
      color: black;
    }

    .btn-lg {
        width: 200px;
    }
    `}
    </style>

    <div className="homepage-background">
    <h1 className='topmoverheader'></h1>
        <Row>
            <Col className='homepage-container' md={{span:4, offset:1}}>
                <p className='findinfo'>Find out what stocks politicians are trading</p>
                <Row>
                    <Col>
                        <Link to={`/recenttransactions`}>
                            <Button variant='success' size='lg'>
                                See Recent Transactions
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={`/politicians`}>
                            <Button variant='success' size='lg'>
                                Search by Politician
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
            <Col className='homepage-container' md={{span:4,offset:2}}>
                <Row>
                    <Col lg={7} md={12} sm={12}>
                    <p className='featured-header'>Today's Featured Politician</p>
                    </Col>
                    <Col lg={5} md={12} sm={12}>
                    <HomepageCard
                            src={lincoln}
                            text="Abraham Lincoln"
                            path={`/politician/3`}
                            key={3}
                    />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
    </>
    );
  };
