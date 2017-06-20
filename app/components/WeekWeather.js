import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
} from 'react-native';

import api from './../utilities/api';

class WeekWeather extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailyWeather: [],
      cityName: '',
    }
  }

  componentWillMount() {
    api.getDailyWeather().then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dailyWeather: ds.cloneWithRows(response.list),
        cityName: response.city.name,
      })
    });
  }

  render() {

    return(
				<View style={styles.container}>
        // <Text>{this.state.cityName}</Text>
        // <ListView
        //   dataSource={this.state.dailyWeather}
        //   renderRow={(rowData) => <Text>{rowData.speed}</Text>}
        // />
        <Text>{this.state.cityName}</Text>
      </View>
		);
	}
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
  },
});

export default WeekWeather;
