import React from 'react';
import { Table } from 'react-bootstrap';

const Trade = ({ trade }) => {
    return (
        /*<table className='trade'>
            <tr>
                <td>
                    <h3>{trade.date}</h3>
                </td>
                <td>
                    <p>{trade.stock}</p>
                </td>
                <td>
                    <p>{trade.sector}</p>
                </td>
                <td>
                    <p>{trade.buy_sell}</p>
                </td>
                <td>
                    <p>{trade.amount}</p>
                </td>
            </tr>
        </table>*/
                <tr>
                    <td>{trade.date}</td>
                    <td>{trade.politician}</td>
                    <td>{trade.stock}</td>
                    <td>{trade.sector}</td>
                    <td>{trade.buy_sell}</td>
                    <td>{trade.amount}</td>
                </tr>
    )
}

export default Trade