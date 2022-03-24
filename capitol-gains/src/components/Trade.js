import React from 'react'

const Trade = ({ trade }) => {
    return (
        <table className='trade'>
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
        </table>
    )
}

export default Trade