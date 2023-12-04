const getRandomNumArr = (max) => {
    const numArr = [];
    while (numArr.length < max) {
        const randNum = Math.floor(Math.random() * max);
            if (numArr.indexOf(randNum) === -1) {
                numArr.push(randNum)
            }
        }
        console.log(numArr);
    return numArr;
}
const videos = ["cuh5HsU7WQQ?si=5-VJZ4icUg3ZMJTt", "aui0gg_Zstc?si=YChOOZaFjqHcnCA2","h63JTsVdntw?si=2qCpKhG_FNrgrfPJ","__7abSf4D7Q?si=-3zpE3CR3r_WHFuM","1bP5AvsRex4?si=xxjypihQCL96Q584","qkzKd2Pk-5I?si=OaQRC9mQSz6RGz9x"]
var numOfVideos = 4;
const randomNumArr = getRandomNumArr(videos.length-1);
for (let i = 0; i < numOfVideos; i++) {
    var iframe = document.createElement("iframe");
    var iframeHTML = `<iframe id='videos' className='move' title='YouTube video player' src= "https://www.youtube.com/embed/${videos[randomNumArr[i]]}" height = '60%'' width = '49%'></iframe>`; 
    document.getElementById("videos").innerHTML += iframeHTML;
}