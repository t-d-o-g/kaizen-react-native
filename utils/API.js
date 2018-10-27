import axios from 'axios'
let url = 'https://kaizen-72441.herokuapp.com/api/ticketxrefs'

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
}
