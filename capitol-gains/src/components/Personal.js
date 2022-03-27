import React from 'react'

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

    )
}

export default Personal