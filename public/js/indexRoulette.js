window.onload = function() {
    let imgBanner = document.querySelector(".banner")
    
    const images = ["/img/banner-3.jpg", "/img/Yellow Abstract Summer Sale Banner.png"]
    let interval = 5000
    let index = 0
    imgBanner.src = images[index]

    let rouletteFunction = function() {
        if(index === (images.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        imgBanner.src = images[index]
    }

    window.setInterval(rouletteFunction, interval)
}