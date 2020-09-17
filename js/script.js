//global variables
const url = 'https://randomuser.me/api/?results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const htmlBody = document.querySelector('body');

//getting data from the API    
 function fetchData(url) {
    return fetch(url)
    .then(data => data.json())
}
//calls the function to obtain info from the API and then subsequently creates the gallery and search bar
fetchData(url)
    .then(data => {
        generateGallery(data);
    }) 
    // .then(generateSearchBar)


//function to set the innerHTML of the search container div to create the search bar
// function generateSearchBar () {
//     searchContainer.innerHTML = `
//     <form action="#" method="get">
//      <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
//     </form>
//     `;
//     }
//creates the gallery by setting the innerHTML for each of the results returned
    function generateGallery(data) {
        const employeeCards = data.results;
        console.log(employeeCards);
        employeeCards.forEach(card => {
            let div = document.createElement('div');
            div.className = "card";
            div.innerHTML = `<div class="card-img-container">
            <img class="card-img" src=${card.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
            <p class="card-text">${card.email}</p>
            <p class="card-text cap">${card.location.city} ${card.location.state}</p>
        </div>
    </div>`;
    gallery.append(div);

    //event listener for each employee card
    div.addEventListener('click', ( ) => {
        generateModal(card)
    })
})
}
//creates the modal window which access extra information about each employee
 function generateModal(employeeInfo) {
     let employeeEmail = employeeInfo.email;
     let employeeCell = employeeInfo.cell;
     let employeeAddress = employeeInfo.location.street.number + ' ' + employeeInfo.location.street.name + ' ' + employeeInfo.location.city + ', ' + employeeInfo.location.state + ' ' + employeeInfo.location.postcode;
    //This takes the JSON date and reformatts it so it is easily readable
     function birthday(date) {
        let jsonDate = new Date(date);
        let datestr = jsonDate.toLocaleDateString();
        return datestr;
    }
    //creates each modal window with placeholders for all the information
    const modalContainer = document.createElement('div');
    modalContainer.className = "modal-container";
    modalContainer.innerHTML = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${employeeInfo.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${employeeInfo.name.first} ${employeeInfo.name.last}</h3>
            <p class="modal-text">${employeeEmail}</p>
            <p class="modal-text cap">${employeeInfo.location.city}</p>
            <hr>
            <p class="modal-text">${employeeCell}</p>
            <p class="modal-text">${employeeAddress}</p>
            <p class="modal-text">Birthday: ${birthday(employeeInfo.dob.date)}</p>
        </div>
        </div>;`
        //adds the modal window
        htmlBody.append(modalContainer);
    //event listener for the close button on each modal window
    const button = document.querySelector('button');
    console.log(button);
    button.addEventListener('click', (e) => {
        modalContainer.remove();
     })
     
 };
