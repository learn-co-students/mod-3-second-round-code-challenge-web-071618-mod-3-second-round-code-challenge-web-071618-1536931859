//
// You will be building out an application that allows a user to purchase movie tickets.
//

// As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.
//
// As a user I should not be able to purchase a ticket for a sold out showing.

const theatreId = 15;
const ticketURL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
const postURL = `https://evening-plateau-54365.herokuapp.com/tickets`

const showings = document.getElementById('showings')


fetch(ticketURL)
.then(r => r.json())
.then(displayTickets)

function displayTickets(data){
data.showings.forEach((element) => {
  let ticektsLeft = 20 - element.tickets_sold
showings.innerHTML += `<div class="card">
  <div class="content">
    <div class="header">
      ${element.film["title"]}
    </div>
    <div class="meta">
      ${element.film["runtime"]} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${element.showtime}
      </span data-id="${element.id}" class="tickets">
       ${ticektsLeft} remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div data-id="${element.id}" class="ui blue button">Buy Ticket</div>
  </div>
</div>`
})}



showings.addEventListener('click', function(){
  if(event.target.dataset.id){
  let showId = event.target.dataset.id
console.log(event.target)
  fetch(postURL,  {
    method: 'POST',
    body: JSON.stringify({showing_id: showId }),
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(r=> r.json())
  .then()
}
})
