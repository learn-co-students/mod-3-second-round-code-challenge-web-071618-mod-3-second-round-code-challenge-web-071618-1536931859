// DELIVERABLE 1
// As a user, when the page loads I should see a list of movie showings fetched from a remote API.
// 1) fetch from API
// 2) iterate through movieObj to get the showings
// 3) append to movieShowing div with <li> and innerHTML
//
// DELIVERABLE 2
// As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement
// the remaining tickets by one. This information should be persisted in the remote API.
// 1) event delegation to the entire div class card
// 2) add event listener to the div class card
// 3) event.target the buy ticket button
// 4) post it on the backend so that the data is persisted
//
// DELIVERABLE 3
// As a user I should not be able to purchase a ticket for a sold out showing
// 1) need to add a conditional in the event listener so that the tickets are greater than 0


const theatreId = 12;
const movieShowing = document.getElementById('movie-showing');

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/12`)
.then(response => response.json() )
.then( movieObj => displayShowings(movieObj) )

function displayShowings(movieObj) {
  movieObj.showings.forEach(showing => {
    movieShowing.innerHTML += `<div id='movie-showing-card' class="card" data-movie-showing-card='${showing.id}'>
                                <div class="content">
                                  <div class="header">
                                    ${showing.film.title}
                                  </div>
                                  <div class="meta">
                                    ${showing.film.runtime}
                                  </div>
                                  <div class="description" data-action='${showing.id}'>
                                    <span class="ui label">
                                      ${showing.showtime}
                                    </span>
                                      ${showing.capacity - showing.tickets_sold} remaining tickets
                                  </div>
                                </div>
                                <div class="extra content">
                                  <div data-buy-ticket-button='${showing.id}' class="ui blue button">Buy Ticket</div>
                                </div>
                              </div>`

  })
  movieShowing.addEventListener('click', function(event) {
    if (event.target.dataset.buyTicketButton) {
      const showTicketTotal = document.querySelector(`div[data-action='${event.target.dataset.buyTicketButton}']`)

    }

    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/12`,
      {
       method: "POST",
       headers: {
                  'Content-Type': 'application/json',
                  Accepts: 'application/json'
                },
       body: JSON.stringify({ showing_id: 12})
     })
     .then(response => response.json())
     .then(data => {console.log(data)})
  })
}
