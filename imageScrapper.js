const url = 'https://api.thecatapi.com/v1/images/search';
const apiKey = 'b416d36e-f452-4b8c-861a-093055d6727e';

function getCatImage () {
    return new Promise((resolve) => {
        //create http object to query my url
        const http = new XMLHttpRequest();
        http.open('GET', url, true);

        //pass in request header - required api key to get random cat image
        http.setRequestHeader('x-api-key', apiKey);

        //when it becomes successful run this
        http.onreadystatechange = function() {
            //success
            if(http.readyState === 4 && http.status === 200){
                resolve(JSON.parse(http.responseText)[0]);
            }
        };

        http.send();
    }) 

}

function setCatImage(imgUrl) {
    document.querySelector('#cat-img').setAttribute('src', imgUrl);
}

function displayCatImage() {
    getCatImage().then(res => {
        setCatImage(res.url);
    });
}

let audio;

// Retrieve initial image
displayCatImage();

// Add action listener to button
document.querySelector('#cat-btn').addEventListener('click', () => {
    setCatImage('main.gif');

    if (!audio) {
        audio = new Audio('meow.mp3');
        audio.play();
    }

    setTimeout(() => {
        displayCatImage();
    }, 500)
});

