import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import { getPolitician } from '../politicians';
import '../../App.css';
import placeholder from '../images/placeholder.jpg';
import pie from '../images/Pie.jpg';
import line from '../images/line.png';
import Trades from '../Trades';

export default function RecentTransactions() {

  let params = useParams();

  let politician = getPolitician(parseInt(params.politicianId, 10));

  const [trades] = useState([
    {
      id: 1,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$250,000-$500,000',
    },
    {
      id: 2,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$15,000-$50,000',
    },
    {
      id: 3,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$15,001-$50,000',
    },
    {
      id: 4,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$500,000-$1,000,000',
    },
    {
      id: 5,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$500,000-$1,000,000',
    },
    {
      id: 6,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$1001-$15,000',
    },
    {
      id: 7,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$1001-$15,000',
    },
    {
      id: 8,
      date: '2/1/2022',
      politician: <Link to={`/politician/3`}> Abraham Lincoln</Link>,
      stock: 'Exxon Mobil(XOM)',
      sector: 'Energy',
      buy_sell: 'Buy',
      amount: '$50,001-$100,000',
    },
  ])


    return (
    <>
    <div className="background">
    <Container>
    <h1 className='topmoverheader'></h1>
    <Row className='topmover-container'>
            {/*<Col lg={3} md={6} sm={6}>
                <img className="topmover-pic" src={placeholder} alt="placeholder"/>
                <div className="topmover-info">
                <h4>Politician title</h4>
                <h4>Politician Name</h4>
                </div>
            </Col>*/}
            <Col lg={6} md={6} sm={6}><img className="topmoverpie-pic" src={pie} alt="piechart"/></Col>
            <Col lg={6} md={12} sm={12}><img className="topmoverline-pic" src={line} alt="linegraph"/></Col>
    </Row>
    </Container>
    <Container>
    <Row className='recent-container'>
            <h1 className='recentheader'>Recent Transactions</h1>
            <Col className="recent-transaction" lg={12} md={12} sm={12}><Trades trades={trades}/></Col>
            {/*<Col className="homepage-graph" lg={5} md={12} sm={12}><img className="topmoverline-pic" src={line} alt="linegraph"/></Col>*/}
    </Row>
    </Container>
    </div>
    </>
  );
}


