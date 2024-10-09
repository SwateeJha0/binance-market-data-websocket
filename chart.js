// # Handles chart rendering and updates


const ctx = document.getElementById('chart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'candlestick',
    data: {
        datasets: [{
            label: 'Candlestick Data',
            data: [] // Placeholder for chart data
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { type: 'time' },
            y: { beginAtZero: false }
        }
    }
});

// Function to update the chart with new candlestick data
function handleNewCandlestick(candlestick) {
    chart.data.datasets[0].data.push({
        t: candlestick.t,
        o: candlestick.o,
        h: candlestick.h,
        l: candlestick.l,
        c: candlestick.c
    });
    chart.update(); // Update the chart with the new data
}

// Function to load stored data into the chart
function updateChartWithStoredData(storedData) {
    chart.data.datasets[0].data = storedData || [];
    chart.update();
}
