document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `https://evening-plateau-54365.herokuapp.com/theatres/`
  let theatreId = '11';
  let cardsHolder = document.getElementById('ui-cards-showings')

  fetch(baseURL + 11)
  .then(response => response.json())
  .then(displayShowings)

  function displayShowings(showData){
    showData.showings.forEach(show =>{
      console.log(show)
      cardsHolder.innerHTML += `<div class="card">
        <div class="content">
          <div class="header">
            ${show.film.title}
          </div>
          <div class="meta">
            ${show.film.runtime} minutes
          </div>
          <div class="description">
            <span class="ui label">
              ${show.showtime}
            </span>
            ${show.capacity - show.tickets_sold} remaining tickets
          </div>
        </div>
        <div class="extra content">
          <div id='buy-ticket-button' class="ui blue button">Buy Ticket</div>
        </div>
      </div>`
      let ticketButton = document.getElementById('buy-ticket-button')
      ticketButton.addEventListener('click', () => {
        let showingid = 110
        fetch("https://evening-plateau-54365.herokuapp.com/tickets",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({showing_id: showingid, tickets_sold: 10 })
      })

      })

    })
  }

  //USING EVENT DELEGATION
  //DECREASE TICKET COUNT BY 1
  //SHOW CAPACITY -= 1, SAVE TO VARIABLE
  //SET VARIABLE IN BODY
  //PERSIST TO BACKEND


  document.addEventListener('click', (event) => {
      if (event.target.id === 'buy-ticket-button'){
        let showing_id = 109
          fetch("https://evening-plateau-54365.herokuapp.com/tickets",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({showing_id: showing_id})
        })
      }
  })
})
