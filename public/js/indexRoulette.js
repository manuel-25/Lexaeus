window.onload = function() {
    let imgBanner = document.querySelector(".banner")
    let leftArrow = document.querySelector(".fa-chevron-left")
    let rightArrow = document.querySelector(".fa-chevron-right")
    const images = ["/img/modern green coming soon (Banner (Landscape)).png", "/img/Yellow Abstract Summer Sale Banner.png", "/img/Lexaeus - Banner (Calzado OFF).png"]


    let interval = 5000
    let index = 0
    imagesLength = images.length - 1
    imgBanner.src = images[index]


    let rouletteFunction = function() {
        if(index === imagesLength) {
            index = 0
        } else {
            index += 1
        }
        imgBanner.src = images[index]
    }

    let rouletteInterval = window.setInterval(rouletteFunction, interval)

    leftArrow.addEventListener('click', function() {
        console.log(index)
        if(index != 0) {
            index --
            imgBanner.src = images[index]
            clearInterval(rouletteInterval)
            rouletteInterval = window.setInterval(rouletteFunction, interval)
        } else {
            if(index == 0) {
                index = imagesLength
                imgBanner.src = images[index]
                clearInterval(rouletteInterval)
                rouletteInterval = window.setInterval(rouletteFunction, interval)
            }
        }
    })

    rightArrow.addEventListener('click', function() {
        console.log(index)
        if(index != imagesLength) {
            index ++
            imgBanner.src = images[index]
            clearInterval(rouletteInterval)
            rouletteInterval = window.setInterval(rouletteFunction, interval)
        } else {
            if(index == imagesLength) {
                index = 0
                imgBanner.src = images[index]
                clearInterval(rouletteInterval)
                rouletteInterval = window.setInterval(rouletteFunction, interval)
            }
        }
    })
}