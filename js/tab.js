((timeOut) => {
    const WAIT = timeOut * 1000;
    const GIF = document.getElementById('gif');
    let wantsLandscape = window.innerWidth >= window.innerHeight;
    let firstGif = true;

    function resetImage() {
        fetch('http://tv.giphy.com/v1/gifs/screensaver?api_key=wBL1FvTTel6OQ&tag=giphytrending&rating=pg')
            .then(r => r.json())
            .then(({data: d}) => {
                if (d.image_width >= d.image_height === wantsLandscape) {
                    if (firstGif) {
                      firstGif = false;
                      updateBackground(d.image_url);
                    } else {
                      preloadGif(d.image_url);
                    }
                } else {
                    resetImage();
                }
            });
    }

    function preloadGif(url, width, height) {
      const img = new Image(width, height);
      img.onload = () => updateBackground(url);
      img.onerror = resetImage;
      img.src = url;
    }

    function updateBackground(url) {
        GIF.style.backgroundImage = `url("${url}")`;
        setTimeout(resetImage, WAIT);
    }

    window.onresize = () => wantsLandscape = window.innerWidth >= window.innerHeight;

    resetImage();
})(5);
