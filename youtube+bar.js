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