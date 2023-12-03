import {getCurrentWeight, getTargetWeight} from './database.js';

function moveBar() {
    var barWidth = document.getElementById("healthBar").style.width;
    var targetWeight = getTargetWeight();
    var currentWeight = getCurrentWeight();
    var weightDiff = Math.abs(targetWeight - currentWeight);
    console.log (weightDiff);
    barWidth = (weightDiff/targetWeight + "%");
}

const vidoes = ["testURL", "testURL2"];

function setVideos() {
    for (let i = 1; i <= 2; i++) {
        var random = 1;
        const videoIframe = document.createElement("iFrame");
        video.setAttribute("src", vidoes[random]);
        document.body.appendChild(videoIframe);
    }
}

<div class="videos" id="videos">
          
          <script>
            const videos = ["https://www.youtube.com/embed/cuh5HsU7WQQ?si=5-VJZ4icUg3ZMJTt", "https://www.youtube.com/embed/aui0gg_Zstc?si=YChOOZaFjqHcnCA2,"]
            for (let i = 0; i < 2; i++) {
                var iframe = document.createElement("iframe");
                var randomInt = Math.floor(Math.random() * videos.length);
                var iframeHTML = "<iframe id='frame" + i + "' className='move' title='YouTube video player' src=' "+ videos[randomInt] +" 'frameborder='0' width = 256px allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>";
                document.getElementById("videos").innerHTML += iframeHTML;
            }
          </script>

        </div>