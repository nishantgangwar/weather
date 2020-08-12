console.log("Hi your Client Side Web page is installeds");



const wheatherForm = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2');


wheatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    message1.textContent = 'Laoding Please Wait';
    message2.textContent ='';
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    
    response.json().then((data) => {
       if(data.error){
           message1.textContent = data.error
       }
       else{
           message1.textContent = data.location ;
           message2.textContent = data.forecast;
           
       }
    })
    
})

})