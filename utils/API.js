import axios from 'axios'

const url = 'https://kaizen-72441.herokuapp.com/api/ticketxrefs'

export default {
  getAllTickets: function() {
    return axios.get(url)
  },

  saveTicket: function(ticketDescription) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/tickets', ticketDescription)
  },

  saveLocation: function(location) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/locations', location)
  },

  saveTicketXrefs: function(newTicketXrefs) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/ticketxrefs', newTicketXrefs)
  },

  updateTicket: function(updatedTicket) {
    return axios.put('https://kaizen-72441.herokuapp.com/api/tickets', updatedTicket)
  },

  updateTicketXrefs: function(updatedTicketXrefs) {
    return axios.put('https://kaizen-72441.herokuapp.com/api/ticketxrefs', updatedTicketXrefs)
  },

  registerUser: userProfile => {
    //@todo: can add a hash function later to increase security
    console.log(userProfile)
    return axios.post('https://kaizen-72441.herokuapp.com/api/user', userProfile)
  },

  loginUser: user => {
    //@todo: can add a hash function later to increase security
    console.log(user)
    return axios.post('https://kaizen-72441.herokuapp.com/api/login', user)
  },
}
