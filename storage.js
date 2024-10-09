// # Manages local storage for chart data


// Save chart data to local storage
function saveChartData(symbol, interval, data) {
    const key = `${symbol}_${interval}`;
    localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve chart data from local storage
function getChartData(symbol, interval) {
    const key = `${symbol}_${interval}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}
