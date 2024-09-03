let crackElement = document.getElementById('crack');
let crackHeight = 0;
let crackMaxHeight = 180;
let crackInterval;
let crackData = [];
let isPaused = false;
let graph;

const ctx = document.getElementById('crackGraph').getContext('2d');

function initializeGraph() {
    graph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Crack Length Over Time',
                data: crackData,
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function startSimulation() {
    if (crackInterval || isPaused) return;
    crackInterval = setInterval(() => {
        if (crackHeight < crackMaxHeight) {
            crackHeight += 2;
            crackElement.style.height = `${crackHeight}px`;
            crackData.push(crackHeight / 2);
            graph.data.labels.push(`${(crackData.length / 10).toFixed(1)}s`);
            graph.update();
        } else {
            clearInterval(crackInterval);
        }
    }, 100);
}

function pauseSimulation() {
    clearInterval(crackInterval);
    crackInterval = null;
    isPaused = true;
}

function resetSimulation() {
    clearInterval(crackInterval);
    crackInterval = null;
    isPaused = false;
    crackHeight = 0;
    crackElement.style.height = '0px';
    crackData = [];
    graph.data.labels = [];
    graph.update();
}

document.getElementById('startSimulation').addEventListener('click', startSimulation);
document.getElementById('pauseSimulation').addEventListener('click', pauseSimulation);
document.getElementById('resetSimulation').addEventListener('click', resetSimulation);

window.onload = initializeGraph;
