import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap'

const Personal = ({ personal }) => {
    return (
        <div className='full_bio'>
            <img alt="bioimage" src={personal.photo}/>
            <table className='bio_info'>
                <tr>
                    <td>
                        <p>Name: {personal.first_name}</p>
                        <p>{personal.middle_name}</p>
                        <p>{personal.last_name}</p>
                    </td>
                    <td>
                        <p className='rightside'>Transactions: {personal.transactions}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Date of Birth: {personal.date_of_birth}</p>
                    </td>
                    <td>
                        <p className='rightside'>Most Recent Trade: {personal.recent_trade}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Party: {personal.party}</p>
                    </td>
                    <td>
                        <p className='rightside'>Total Trade Volume: ${personal.trade_volume}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>State: {personal.state}</p>
                    </td>
                </tr>
                <tr>
                    <td className="chamber">
                        <p>Chamber: {personal.chamber}</p>
                    </td>
                    <td>
                        <p className="graphtext">Recent:</p>
                    </td>
                </tr>

            </table>

        </div>
       /*
       <Container className='full_bio'>
           <Row>
               <Col md={3} sm={3}>
                   <img alt="bioimage" src={personal.photo}/>
                </Col>
               <Col md={3} sm={3}>
                <Table className="bio_info" borderless>
                    <tbody>
                        <tr>
                            <td>Name: {personal.first_name}</td>
                            <td>Transactions: {personal.transactions}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth: {personal.date_of_birth}</td>
                            <td>Most Recent Trade: {personal.recent_trade}</td>
                        </tr>
                        <tr>
                            <td>Party: {personal.party}</td>
                            <td>Total Trade Volume: ${personal.trade_volume}</td>
                        </tr>
                        <tr><td>State: {personal.state}</td></tr>
                        <tr><td>Chamber: {personal.chamber}</td></tr>
                    </tbody>
                </Table>
                </Col>
                <Col md={6} sm={6}></Col>
            </Row>
       </Container>
       */
    )
}

export default Personal