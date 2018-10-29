import axios from 'axios'

const url = 'https://kaizen-72441.herokuapp.com/api/ticketxrefs'

export default {
  getAllTickets() {
    return axios.get(url)
  },
  saveTicket(ticketDescription) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/tickets', ticketDescription)
  },
  saveLocation(location) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/locations', location)
  },
  saveTicketXrefs(newTicketXrefs) {
    return axios.post('https://kaizen-72441.herokuapp.com/api/ticketxrefs', newTicketXrefs)
  },
  updateTicket(updatedTicket) {
    return axios.put('https://kaizen-72441.herokuapp.com/api/tickets', updatedTicket)
  },
  updateTicketXrefs(updatedTicketXrefs) {
    return axios.put('https://kaizen-72441.herokuapp.com/api/ticketxrefs', updatedTicketXrefs)
  },
}
