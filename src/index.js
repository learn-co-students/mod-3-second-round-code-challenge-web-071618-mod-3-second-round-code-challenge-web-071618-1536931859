const theatreId = 13;
const theatreUrl = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
const ticketPostUrl = `https://evening-plateau-54365.herokuapp.com/tickets`
const showingsDiv = document.getElementById('showings')


function getShowings(){
  fetch(theatreUrl)
  .then(res => res.json())
  .then(films => {
    showFilmsOnPage(films)
  })
}

function showFilmsOnPage(films){
  showingsDiv.innerHTML = ''
  films.showings.forEach(showing => {
    showingsDiv.innerHTML += `<div data-id='${showing.id}' class="card">
  <div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${showing.showtime}
      </span>
      <span>(Num Tickets) </span><span id='tickets-remaining'>${showing.capacity - showing.tickets_sold}</span>
    </div>
  </div>
  <div class="extra content">
    <div id='buy-button' class="ui blue button">Buy Ticket</div>
  </div>
</div>`
  })
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'buy-button'){
    // const buyButton = document.getElementById('buy-button')
    const buttonParent = event.target.parentNode.parentNode
    const ticketsRemaining = buttonParent.children[0].children[2].children[2].innerHTML
    const showId = buttonParent.dataset.id
    if (ticketsRemaining > 0){
      sellTicket(showId)
    }
  }
})

function sellTicket(showId){
  fetch(ticketPostUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({showing_id: `${showId}`})
  }).then(getShowings)
}

getShowings()
