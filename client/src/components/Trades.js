import Trade from './Trade';
import { Table } from 'react-bootstrap'

function sorted(trades, sortMethod) {
    if (sortMethod === "new") { //sort by oldest
        //
        function dateComparison(a, b) {
            const date1 = new Date(a)
            const date2 = new Date(b)
            
            return date1 - date2;
        }
        
        trades.sort(dateComparison);

    }    
    if (sortMethod === "old") { //sort by oldest
        //
    }
    if (sortMethod === "stock") { //sort by storck
        trades.sort((a, b) => (a.stock > b.stock) ? 1 : -1);
    }
    if (sortMethod === "sector") { //sort by sector
        trades.sort((a, b) => (a.sector > b.sector) ? 1 : -1);
    }
    if (sortMethod === "transaction") { //sort by sector
        trades.sort((a, b) => (a.buy_sell > b.buy_sell) ? 1 : -1);
    }
    if (sortMethod === "amount") { //sort by oldest
        //
    }        
}

const trades = ({ trades }) => {
    let sortMethod = "date";
    sorted(trades, sortMethod);

    return (
        //<div className="trades">
        <Table className='trades' striped hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Politician</th>
                    <th>Stock Name</th>
                    <th>Industry</th>
                    <th>Transaction Amount</th>
                    <th>Gains/Losses</th>
                </tr>
            </thead>
            <tbody>
            {trades.map((trade) => (
                <Trade  key={trade.id} trade={trade} />
            ))}
            </tbody>
        </Table>
        //</div>
    )
}

export default trades

/*
function sorted(tradeInfo) {
    if (tradeInfo.sortMethod === "stock") { //sort by storck
        tradeInfo.trades.sort((a, b) => (a.stock > b.stock) ? 1 : -1);
    }
    if (tradeInfo.sortMethod === "sector") { //sort by sector
        tradeInfo.trades.sort((a, b) => (a.sector > b.sector) ? 1 : -1);
    }
}

const trades = ({ tradeInfo }) => {
    sorted(tradeInfo);

    return (
        <div className="trades">
        {tradeInfo.trades.map((trade) => (
            <Trade  key={trade.id} trade={trade} />
        ))}
        </div>
    )
}*/