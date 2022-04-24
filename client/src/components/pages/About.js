import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../App.css';
import placeholder from "../images/placeholder.jpg"

const About = () => {
    return (
        <>
        <div className="background">
        <Container className='teaminfo-container'>
        <h1 className='topmoverheader'></h1>
        <Row className='teaminfo'>
        <h1 className='teaminfoheader'>The Team</h1>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Ethan</h5>
                <p>Ethan is the Project Manager and originator
                    for the idea of Capitol Gains. He also works
                    on the Deployment and Backend Team.</p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Tere</h5>
                <p>Tere is a Project Lead and keeps track of
                    deadlines in order to make our project run
                    smoothly. He also works on the UI Team to
                    make our website look great.</p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Alvin</h5>
                <p>Alvin is a Project Engineer and manages the massive amount
                    of API calls needed to run our website. He works on the 
                    Data and Visualization Team making sure our website
                    shows precisely what's important.</p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Cam</h5>
                <p>Cam is a Project Lead and makes sure the
                    everything works and matches our requirements.
                    He also works on the deployment and backend team.</p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Josh</h5>
                <p>Josh is a Project Engineer and designs every UI/UX
                    element on the website. He also works on
                    the UI Team ensuring everything runs flawlessly.</p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <img className="teaminfopic" src={placeholder} alt="placeholder"/>
                <h5>Brandon</h5>
                <p>Brandon is a Project Engineer and works on building informative
                    visualizations. He also works on the Data and Visualization Team to manage and transform the data.</p>
                </Col> 
        </Row>
        </Container>
        <Container>
        <Row className='aboutdata'>
        <h1 className='aboutdataheader'>About the Data</h1>
        <Col xl={4} lg={6} md={6} sm={12}>
                <h5>Senate and House StockWatcher</h5>
                <p>The SenateStockWatcher and HouseStockWatcher
                    datasets are that are collated from
                    the United States Financial Disclosures website. These
                    datasets are collated and updated daily by the StockWatcher websites
                    and can be obtained from
                    https://senatestockwatcher.com/
                    and https://housestockwatcher.com/ respectively.
                    Financial reporting for Congress Members is available
                    as a result of bipartisan political efforts to combat insider
                    trading. The STOCK (Stop Trading on Congressional
                    Knowledge) Act of 2012 outlines reporting data and
                    frequencty. The STOCK Act of 2012 Passed in the Senate
                    with a vote of 96-3 and in the House with a vote of 417-2.
                </p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <h5>ProPublica Data</h5>
                <p>The ProPublica API is a collation of data sources from:<br></br>
                    -The United Sates Project<br></br>
                    -Office of the Clerk of U.S. House of Representatives<br></br>
                    -United States Senate Website Voting Data<br></br>
                    -UnitedStates.io for Biographical Info<br></br>
                    -MIT Professor Charles Stewart’s Congressional Data<br></br>
                    -Library of Congress Data from Congress.gov<br></br>

                    For more information, visit
                    propublica.org/api-docs/congress-api/#data-sources

                    This data set is used to populate pictures for Congress
                    members, biographies, party affiliation, and state.
                </p>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                <h5>Polygon.io Data</h5>
                <p>
                In order to provide context to the trades made by Congress members, we use market data about the financial assets.
                Polygon.io is an industry leading API trusted by companies
                like Google and Robinhood to get the most accurate and up to date trading information for stocks and cryptocurrencies.
                </p>
                </Col>
        </Row>
        </Container>
        </div>
        
    </>
    );
  };

  export default About;