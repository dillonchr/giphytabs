((secondsToWait) => {
    const WAIT = secondsToWait * 1000;
    const GIF = document.getElementById('gif');
    let wantsLandscape = window.innerWidth >= window.innerHeight;

    function resetImage(firstGif) {
        fetch('http://tv.giphy.com/v1/gifs/screensaver?api_key=2mbd9rzNUxHGhGcdmJ7LroifN007msvy&tag=giphytrending&rating=pg')
            .then(r => r.json())
            .then(({data: d}) => {
                if (d.image_width > d.image_height === wantsLandscape) {
                    if (firstGif) {
                      updateBackground(d.image_url);
                    } else {
                      preloadGif(d.image_url, d.image_width, d.image_height);
                    }
                } else {
                    resetImage();
                }
            });
    }

    //  preload gif to prevent jankiness in animations
    function preloadGif(url, width, height) {
      const img = new Image(width, height);
      img.onload = () => updateBackground(url);
      img.onerror = resetImage;
      img.src = url;
    }

    //  changes tab background to show current gif
    function updateBackground(url) {
        GIF.style.backgroundImage = `url("${url}")`;
        setTimeout(resetImage, WAIT);
    }

    //  if you wind up changing your window we can start
    //  looking for appropriately oriented giphys
    //  fair warning: not many portrait or square ones exist
    window.onresize = () => wantsLandscape = window.innerWidth >= window.innerHeight;
    
    //  set background without preload for first image
    //  kick off loop
    resetImage(true);
})(5);
