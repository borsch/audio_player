var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var visualizer = document.getElementById('visualizer'),
    rects_number = 200,
    rect_width = 5,
    svg_height = visualizer.getAttribute('height'),
    frequencyData = new Uint8Array(rects_number)
    rects = [];

svg_height = parseInt(svg_height);  

for (var i = 0; i < rects_number; ++i) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('y', svg_height);
    rect.setAttribute('width', rect_width);
    rect.setAttribute('height', 0);
    rect.setAttribute('x', rect_width * i);

    rects.push(rect);
    visualizer.appendChild(rect);
}


var run = true;

function renderChart() {
    if (run) {
        requestAnimationFrame(renderChart);
    }

    analyser.getByteFrequencyData(frequencyData);

    rects.forEach(function(rect, i){
        rect.setAttribute('y', svg_height/2 - frequencyData[i]/2);
        rect.setAttribute('height', frequencyData[i]);
        rect.setAttribute('fill', 'rgb('+i+', '+frequencyData[i]+', '+i+')');
    });
}

renderChart();


function play() {
    document.getElementById('audioElement').play();
}

function pause() {
    document.getElementById('audioElement').pause();
}

function increment() {
    document.getElementById('audioElement').volume+=0.1;
}

function decrement() {
    document.getElementById('audioElement').volume-=0.1
}