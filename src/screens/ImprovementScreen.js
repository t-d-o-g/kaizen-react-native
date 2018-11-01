import React from 'react'
import { StatusBar, FlatList } from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import { Container, Header, Body, Content, Left, Right, Icon } from 'native-base'
import API from '../../utils/API'
import userInfo from '../../utils/userInfo'

export default class ImprovementScreen extends React.Component {
  static navigationOptions = {
    title: 'Improvements',
  }

  constructor(props) {
    super(props)
    this.state = {
      userTickets: [],
    }
  }

  componentDidMount() {
    const userTickets = []
    // const userTicket = {}

    const tickets = userInfo
      .getUserInfo()
      .then(response => {
        if (response !== null) {
          return API.getTicketsByUserId(response.id)
        }
        // userTicket.Ticket.ticket = 'Login to see your improvements.'
        // userTicket.Ticket.id = 1
        // userTickets.push(userTicket)
        return undefined
      })
      .catch(err => {
        throw err
      })

    tickets
      .then(response => {
        if (response !== undefined) {
          if (response.data.length === 0) {
            // userTicket.Ticket.ticket = 'You do not have any improvements yet.'
            // userTicket.Ticket.id = 1
            // userTickets.push(userTicket)
          } else {
            for (let i = 0; i < response.data.length; i++) {
              userTickets.push(response.data[i])
            }
          }
        }

        this.setState({
          userTickets,
        })
      })
      .catch(err => {
        throw err
      })
  }

  renderHeader = () => <SearchBar placeholder="Type Here..." lightTheme round />

  render() {
    const { userTickets } = this.state
    const { navigation } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#282828' }}>
          <Left>
            <Icon
              name="md-menu"
              style={{ color: 'white' }}
              onPress={() => navigation.openDrawer()}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <List>
            <FlatList
              data={userTickets}
              keyExtractor={item => item.Ticket.id.toString()}
              ListHeaderComponent={this.renderHeader}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.Ticket.ticket}`}
                  onPress={() =>
                    navigation.navigate('TicketDetails', {
                      ticketInfo: {
                        user: `${item.User.first_name} ${item.User.last_name}`,
                        status: item.Status.status,
                        category: item.Category.category,
                        description: item.Ticket.ticket,
                        updated: item.Ticket.updatedAt,
                        userId: item.User.id,
                        ticketId: item.Ticket.id,
                      },
                    })
                  }
                />
              )}
            />
          </List>
        </Content>
      </Container>
    )
  }
}
