"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const handleClick = () =>{
    console.log("clicked")
  }
  
 
  const myStocks = async () => {
    let stocks = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": "44062b59-9a21-488a-9af5-89968dea428a",
            }),
            body: JSON.stringify({
              "currency": "USD",
              "sort": "rank",
              "order": "ascending",
              "offset": 0,
              "limit": 5,
              "meta": true
            }),
            });
        let allStocks = await stocks.json();
        console.log('stocks',allStocks)
        localStorage.setItem('stocks', JSON.stringify(allStocks))
        return {
            props: { allStocks },
        };  
    };
    myStocks();
    var stocksList = JSON.parse(localStorage.getItem('stocks') || '[]');
    console.log('ss',stocksList)
  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
              <div className='col-6'>
                  <h3>List of Stocks</h3>
              </div>
              <div className='col-6'>
                  <button onClick={handleClick} className='btn btn-info float-right text-white text-bold'>Fetch</button>
              </div>
        </div>
        <div className='row mt-4'>
              <table className='table table-bordered table-striped table-hover'>
                  <thead className='bg-info text-white'>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Volume 24H</th>
                    <th>Liquidity ±2%</th>
                    <th>All-time High</th>                   
                    <th>1h</th>
                    <th>24h</th>
                  </thead>
                  <tbody>
                  {Object.keys(stocksList).map((k, i) => {
            let data = stocksList[k];
            let capLength = Number(data.cap).toString().length;
            console.log('capLength',capLength)
            let capData = capLength >= 12 ? Number(data.cap/Math.pow(10,capLength-2)).toFixed(2)+' T': Number(data.cap/Math.pow(10,capLength-3)).toFixed(2) +' B';
            
            let volumeLength = Number(data.volume).toString().length;
            let volume = volumeLength >= 10 ? Number(data.volume/Math.pow(10,volumeLength-2)).toFixed(2)+' B': Number(data.volume/Math.pow(10,volumeLength-3)).toFixed(2) +' M';
            console.log('dd',data)
            return (
              <tr key={i}>
                <td><span className="ft-heart heart-icon"></span>{data.rank}</td>
                <td><img className="bordered-img" src={data.png32} width="30" height="30"/> <span>{data.name}</span></td>
                <td>${data.rate.toFixed(2)}</td>
                <td>${capData}</td>                
                <td>${volume}</td>
                <td>${data.cap}</td>
                <td>${data.allTimeHighUSD}</td>
                <td>{data.delta.hour }%</td>
                <td>{data.delta.year }%</td>
              </tr>
            );
          })}
                  </tbody>
              </table>
        </div>
        </div>
    </>
  );
}
