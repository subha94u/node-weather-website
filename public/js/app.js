console.log('client side JS loaded...');
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/    


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent the default behaviour of the browser refresh block

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //http://localhost:3000
    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})
