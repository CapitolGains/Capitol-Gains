import { useState } from 'react'

import Header from '../Header'
import Bio from '../Bio'
import Tabs from '../Tabs'

const App = () => {

  //hard coding we would get a variable like bio from looking it up from the data
  const [bio] = useState([
    {
      first_name: 'John',
      middle_name: 'Quincy',
      last_name: 'Adams',
      date_of_birth: '7/11/1767',
      party: 'Whig',
      state: 'Massachusetts',
      chamber: 'House',
      photo: "https://www.whitehouse.gov/wp-content/uploads/2021/01/06_john_quincy_adams.jpg",
      transactions:"50",
      recent_trade:"12/14/1847",
      trade_volume:"712.45",
      recent_graph:'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
      total_graph:'',
    },
  ])

  //hard coding we would get a variable like trades from looking it up from the data
  const [trades] = useState([
    {
      id: 1,
      date: '5/6/2021',
      stock: 'TSLA',
      sector: 'Auto',
      buy_sell: 'Sell',
      amount: '$250,000-$500,000',
    },
    {
      id: 2,
      date: '3/4/2020',
      stock: 'GOOG',
      sector: 'Tech',
      buy_sell: 'Buy',
      amount: '$15,000-$50,000',
    },
    {
      id: 3,
      date: '1/2/2019',
      stock: 'AAPL',
      sector: 'Tech',
      buy_sell: 'Buy',
      amount: '$15,001-$50,000',
    },
    {
      id: 4,
      date: '11/12/2001',
      stock: 'AMZN',
      sector: 'Retail',
      buy_sell: 'Buy',
      amount: '$500,000-$1,000,000',
    },
    {
      id: 5,
      date: '9/10/2000',
      stock: 'CSCO',
      sector: 'Tech',
      buy_sell: 'Sell',
      amount: '$500,000-$1,000,000',
    },
    {
      id: 6,
      date: '7/8/1999',
      stock: 'T',
      sector: 'Telecom',
      buy_sell: 'Buy',
      amount: '$1001-$15,000',
    },
    {
      id: 7,
      date: '8/14/1995',
      stock: 'GME',
      sector: 'Retail',
      buy_sell: 'Buy',
      amount: '$1001-$15,000',
    },
    {
      id: 8,
      date: '5/6/1998',
      stock: 'F',
      sector: 'Auto',
      buy_sell: 'Buy',
      amount: '$50,001-$100,000',
    },
  ])

  /*
  let sortMethod = "stock";

  let tradeInfo {
    trades,
    sortMethod
  }
  <Tabs trades={tradeInfo}/>
  */

  return (
    <div className="container">
      <Bio className="bio" bio={bio}/>
      <Tabs trades={trades}/>
    </div>
  );
}

export default App;
