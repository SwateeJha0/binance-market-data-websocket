// # Manages WebSocket connections and data handling

let socket;
let currentSymbol = 'ethusdt';
let currentInterval = '1m';

// Function to create WebSocket connection
function createWebSocket(symbol, interval) {
    const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    if (socket) {
        socket.close(); // Close the previous WebSocket connection if it exists
    }
    
    socket = new WebSocket(url);
    
    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        const candlestick = {
            t: message.k.t,
            o: message.k.o,
            h: message.k.h,
            l: message.k.l,
            c: message.k.c,
        };
        handleNewCandlestick(candlestick);
    };
}

// Event listeners for coin and interval changes
document.getElementById('coin-selector').addEventListener('change', (event) => {
    currentSymbol = event.target.value;
    switchCoin(currentSymbol, currentInterval);
});

document.getElementById('timeframe-selector').addEventListener('change', (event) => {
    currentInterval = event.target.value;
    switchCoin(currentSymbol, currentInterval);
});

function switchCoin(symbol, interval) {
    const storedData = getChartData(symbol, interval);
    updateChartWithStoredData(storedData);
    createWebSocket(symbol, interval);
}
