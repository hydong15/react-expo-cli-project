import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

const APP_ID = 'ed47fd9ca2f0ce282cf330ecfd9fa587';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city')}`,
    };
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
    };
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city');
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`)
    .then(response => response.json())
    .then(info => {
      this.setState({
        ...info,
        isLoading: false,
      });
    });
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <Text>loading...</Text>
        </View>
        )
      }
      
      let celsius = this.state.main.temp - 273.15;
      
      return (
        <View style={styles.container}>
          <Text>온도: {celsius.toFixed(1)}</Text>
        </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
      },
    });