import React, {Component} from 'react';
import {ListView, TouchableOpacity} from 'react-native';
import {
  Row,
  Container,
  Header,
  Content,
  List,
  Left,
  ListItem,
  Body,
  Text,
  Item,
  Icon,
  Input,
  Thumbnail,
  Picker,
} from 'native-base';

const playersData = [{
  "player_name": "David Ferrer",
  "skillLevel": 1.5,
  "sex": "male",
  "image": "http://resources3.news.com.au/images/2011/01/28/1225996/397507-david-ferrer.jpg"
},
  {
    "player_name": "Roberto Carballes Baena",
    "skillLevel": 2.5,
    "sex": "male",
    "image": "http://images.wimbledon.com/square/atpcf59.jpg"
  },
  {
    "player_name": "Jaume Munar",
    "skillLevel": 1.5,
    "sex": "male",
    "image": "http://images.wimbledon.com/square/atpmu94.jpg"
  },
  {
    "player_name": "Maria Bueno",
    "skillLevel": 3.5,
    "sex": "female",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Maria_Bueno_2016.jpg"
  },
  {
    "player_name": "Daniel Gimeno-Traver",
    "skillLevel": 4.5,
    "sex": "male",
    "image": "http://images.wimbledon.com/square/atpg676.jpg"
  },
  {
    "player_name": "Rafael Nadal",
    "skillLevel": 2.5,
    "sex": "male",
    "image": "https://specials-images.forbesimg.com/imageserve/5b1567d6a7ea436b547f54ce/416x416.jpg?background=000000&cropX1=1174&cropX2=2630&cropY1=589&cropY2=2045"
  },
  {
    "player_name": "Helene Contostavlos",
    "skillLevel": 1.5,
    "sex": "female",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Helene_%22Mile%22_Contostavlos.png"
  },
  {
    "player_name": "Pablo Andujar",
    "skillLevel": 1.5,
    "sex": "male",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Andujar_WM14_%289%29_%2814456997079%29.jpg/220px-Andujar_WM14_%289%29_%2814456997079%29.jpg"
  },
  {
    "player_name": "Guillermo Garcia-Lopez",
    "skillLevel": 2.5,
    "sex": "male",
    "image": "https://www.atptour.com/-/media/tennis/players/head-shot/2018/garcia_lopez_head_ao18.png"
  },
  {
    "player_name": "Marion Bartoli",
    "skillLevel": 3.5,
    "sex": "female",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Valais_Cup_2013_-_OM-FC_Porto_13-07-2013_-_Marion_Bartoli.jpg/220px-Valais_Cup_2013_-_OM-FC_Porto_13-07-2013_-_Marion_Bartoli.jpg"
  },
  {
    "player_name": "Feliciano Lopez",
    "skillLevel": 3.5,
    "sex": "male",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Feliciano_L%C3%B3pez_1%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg/1200px-Feliciano_L%C3%B3pez_1%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg"
  },
  {
    "player_name": "Pablo Carreno Busta",
    "skillLevel": 1.5,
    "sex": "male",
    "image": "https://www.atptour.com/-/media/tennis/players/head-shot/2018/carrenobusta_head_ao18.png"
  },
  {
    "player_name": "Leslie Allen",
    "skillLevel": 4.5,
    "sex": "female",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Damer_Leslie_Allen.jpg"
  },
  {
    "player_name": "Rafael Nadal",
    "skillLevel": 3.5,
    "sex": "male",
    "image": "https://www.tennisworldusa.org/imgb/47374/rafael-nadal-gifted-amazing-painting-pic-inside.jpg"
  },
  {
    "player_name": "Saniya Mirza",
    "skillLevel": 2.5,
    "sex": "female",
    "image": "https://static.bhaskarhindi.com/media/2018/04/tennis-star-sania-mirza-is-pregnant-confirms-news-shoaib-malik_730X365.jpg"
  }]

export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    console.log(playersData);
    this.state = {
      players: ds.cloneWithRows(playersData),
      searchText: '',
      isFilterOpen: false,
      sex: '',
      skillLevel: ''
    };
  }

  _filterBy = (key, value) => {
    let {players} = this.state;
    const newResults = playersData.filter(player => player[key] == value)
    this.setState({
      [key]: value,
      players: players.cloneWithRows((value != '') ? newResults : playersData),
    })
  }

  _onSearch(searchText) {
    const {players} = this.state;
    const newResults = playersData.filter(function (item) {
      return item.player_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    this.setState({
      players: players.cloneWithRows(newResults),
      newResults,
      searchText,
    });
  }

  render() {
    const {players, isFilterOpen, sex, skillLevel} = this.state;
    return (
      <Container>
        <Header searchBar rounded>
          <Item style={{flex: 0.9}}>
            <Icon name="ios-search"/>
            <Input placeholder="Search by name"
                   onChangeText={text => this._onSearch(text)}/>
            <Icon name="ios-people"/>
          </Item>
          <Item style={{flex: 0.12}}>
            <TouchableOpacity onPress={() => this.setState({isFilterOpen: !isFilterOpen})}>
              <Icon type="FontAwesome" name="filter"/>
            </TouchableOpacity>
          </Item>
        </Header>
        <Content>
          {
            isFilterOpen && <Row>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: '50%'}}
                  selectedValue={sex}
                  onValueChange={this._filterBy.bind(this, 'sex')}
                >
                  <Picker.Item label="Filter By Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </Item>

              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: '50%'}}
                  selectedValue={skillLevel}
                  onValueChange={this._filterBy.bind(this, 'skillLevel')}
                >
                  <Picker.Item label="Filter By Skill Level" value="" />
                  <Picker.Item label="1.0" value="1.0" />
                  <Picker.Item label="1.5" value="1.5" />
                  <Picker.Item label="2.0" value="2.0" />
                  <Picker.Item label="2.5" value="2.5" />
                  <Picker.Item label="3.0" value="3.0" />
                  <Picker.Item label="3.5" value="3.5" />
                  <Picker.Item label="4.0" value="4.0" />
                  <Picker.Item label="4.5" value="4.5" />
                </Picker>
              </Item>
            </Row>
          }
          <ListView
            dataSource={players}
            enableEmptySections={true}
            renderRow={({player_name, skillLevel, sex, image}) =>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{uri: image}}/>
                  </Left>
                  <Body>
                  <Text>{player_name}</Text>
                  <Text note>{skillLevel} {sex}</Text>
                  </Body>
                </ListItem>
              </List>
            }
          />
        </Content>
      </Container>
    );
  }
}
