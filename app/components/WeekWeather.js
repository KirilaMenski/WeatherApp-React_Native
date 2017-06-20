import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
} from 'react-native';

import api from './../utilities/api';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class WeekWeather extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailyWeather: ds,
      cityName: '',
    }
  }

  componentWillMount() {
    api.getDailyWeather().then((response) => {

      this.setState({
        dailyWeather: ds.cloneWithRows(response.list),
        cityName: response.city.name,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

		return(
      <View style={{backgroundColor: '#f0f76a'}}>
        <Text>{this.state.cityName}</Text>
        <View>
          <ListView
            dataSource={this.state.dailyWeather}
            renderRow={(rowData) =>
              <View>
                <Text>{Math.round(rowData.temp.day - 273)} C</Text>
                <Image source={'http://openweathermap.org/img/w/' + rowData.weather[0].icon + '.png'} style={{width:30, height: 30}}/>
              </View>
            }
          />
        </View>
      </View>
		);
	}
}

export default WeekWeather;
