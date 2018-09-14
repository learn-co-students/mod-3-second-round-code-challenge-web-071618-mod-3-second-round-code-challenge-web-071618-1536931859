const theatreId = 10;
  const showContainer = document.getElementById("showings")
  // const showContainer = document.getElementsByClassName("showings")
    // const showContainerArray = Array.from(showContainer)
    // if i wanted to change from array like object to array
    // console.log(showContainer)


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(res => res.json())
.then(theatre => {
// console.log(theatre)
// debugger

  theatre.showings.forEach(showing => {

    let title = showing.film.title
    let runtime = showing.film.runtime
    let showtime = showing.showtime
    let ticketsSold = showing.tickets_sold
    let capacity = showing.capacity
    //get show id somehow
    let ticketsRemaining = `${capacity - ticketsSold}`
   // console.log(showContainer)
    showContainer.innerHTML += ` <div data-id='${showing.id}' class="card">
      <div class="content">
        <div class="header">
          ${title}
        </div>
        <div class="meta">
          ${runtime}
        </div>
        <div class="description">
          <span class="ui label">
            ${showtime}
          </span>
          <p >  ${ticketsRemaining} </p>remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div id="buyTicket" class="ui blue button">Buy Ticket</div>
      </div>
    </div>`






  }) //ends for each







}) //

// let buyTicket = document.getElementById("buyTicket")

// console.log("buyTicket")
//use event delegation for buy ticket see if event taken if the button, add id to button

document.addEventListener("click", function(e) {
  if (e.target.id === 'buyTicket') {
    //get tickets remaining innerhtml and change it

    const showId = e.target.dataset.id
      console.log("got it")
      //consolelog to make sure its right

      //make post request
      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({showing_id: `${showId}`})
    }) //ends fetch
  }





}) //ends event listener
