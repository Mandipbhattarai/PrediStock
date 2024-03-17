const labels = ["Information Technology", "Communication Services", "Consumer Discretionary", "Industrials", "Materials", "Financials", "Real Estate", "Health Care", "Consumer Staples", "Energy", "Utilities"];
const data = {
    labels: labels,
    datasets: [{
        backgroundColor: [
            "#2ecc71",
            "#3498db",
            "#e74c3c",
            "#f1c40f",
            "#9b59b6",
            "#34495e",
            "#16a085",
            "#95a5a6",
            "#f39c12",
            "#e74c3c",
            "#2980b9"
        ],
        data: [20, 20, 15, 6, 4, 4, 3, 0.1, 0.2, 0.4, 1]
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
        scales: {
            y: {
                suggestedMax: 100, // Specify the maximum value for the y-axis
            },
        },
    }
};


var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, config);