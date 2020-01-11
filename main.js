let url = 'https://api.worldtradingdata.com/api/v1/stock?sort_by=list_order&symbol=';
let key = '&api_token=4lJiTjHYkCqmTEOK7arwVAMSTX0eWgC78iVxoiskyzMZOMlU9lbAXgE8SPzJ';
let stock = '';

function search() {
    stock = document.getElementById('input').value;

    fetch(url + stock + key)
        .then(response => {return response.json()})
        .then(data => {
        for (i = 0; i < data.data.length; i++) {
            const table = document.getElementById('stockChart');
            let row = table.insertRow();
            let symbol = row.insertCell();
            let name = row.insertCell();
            let market = row.insertCell();
            let marketCap = row.insertCell();
            let price = row.insertCell();
            let dayHL = row.insertCell();
            let yearHL = row.insertCell();
            let pe = row.insertCell();
            let eps = row.insertCell();
            let yearChange = row.insertCell();
            let percentChangeYear = row.insertCell();
            let optimalPercent = row.insertCell();
            let percentChangeDay = row.insertCell();
            symbol.innerText = data.data[i].symbol;
            name.innerText = data.data[i].name;
            market.innerText = data.data[i].stock_exchange_short;
            marketCap.innerText = (parseInt(data.data[i].market_cap)).toExponential(2);
            price.innerText = data.data[i].price;
            dayHL.innerText = data.data[i].day_low + " => " + data.data[i].day_high;
            yearHL.innerText = data.data[i]["52_week_low"] + " => " + data.data[i]["52_week_high"];
            pe.innerText = data.data[i].pe;
            eps.innerText = data.data[i].eps;
            let range = data.data[i]["52_week_high"] - data.data[i]["52_week_low"];
            yearChange.innerText = Math.round(range);
            percentChangeYear.innerText = Math.round(range/data.data[i].price * 100);
            optimalPercent.innerText = Math.round(range/data.data[i]["52_week_low"]*100);
            let dayRange = data.data[i].day_high - data.data[i].day_low;
            percentChangeDay.innerText = dayRange/data.data[i].price * 100;
        }
    })
}

function sortTable(n) {
    let switching = 'true';
    let table = document.getElementById('stockChart');
    let dir = 'desc';
    while(switching) {
        switching = false;
        rows = table.rows;
        for(i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == 'asc') {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (dir == 'desc') {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }   
            }
        }
        if(shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);      //not that efficient
            switching = true;
        }
    }
}






