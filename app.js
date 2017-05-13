$(document).ready(function () {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    var frequencyData = new Uint8Array(200);

    var visualizer = document.getElementById('visualizer');
    var rects = visualizer.getElementsByTagName('rect');
	rects = Array.prototype.slice.call(rects);	
    
    var height = visualizer.getAttribute('height');
    height = parseInt(height);

    var run = true;

    function renderChart() {
    	if (run) {
     	   requestAnimationFrame(renderChart);
    	}

        analyser.getByteFrequencyData(frequencyData);

        rects.forEach(function(rect, i){
        	rect.setAttribute('y', height/2 - frequencyData[i]/2);
        	rect.setAttribute('height', frequencyData[i]);
            rect.setAttribute('fill', 'rgb('+i+', '+frequencyData[i]+', '+i+')');
        });
    }

    audioElement.onended = function(e) {
    	console.log(e);
    	console.log('end');
    }

    renderChart();
});