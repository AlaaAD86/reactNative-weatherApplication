import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { registerRootComponent } from "expo"; // import it explicitly
import { getWeather, getImageBackgroundSrc } from "./helpers/weatherHelper";
import SearchInput from "./components/SearchInput";
import GeoLocation from './location';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "Pau",
      weather: "",
      temperature: "",
      imageBackground: "",
      loading: true,
      error: false,
    };
  }
  async componentDidMount() {
    await this.onSubmit(`Pau`);
  }

  onSubmit = async (text) => {
    let data = await getWeather(text);
    if (data) {
      this.setState({
        location: text,
        weather: data.weatherStateName,
        temperature: Number(data.temperature.toFixed(1)),
        imageBackground: getImageBackgroundSrc(data.weatherStateAbbr),
        wind: Number(Math.floor(data.wind * (1.6).toFixed(1))),
        humidity: Number(data.humidity.toFixed(1)),
        visibility: Number(Math.floor(data.visibility * (1.6).toFixed(1))),
        predictability: Number(data.predictability.toFixed(1)),
        error: false,
        loading: false,
      });
    } else {
      this.setState({
        error: true,
        loading: false,
        location: text,
        weather: `Could not load weather`,
        temperature: `0`,
        imageBackground: getImageBackgroundSrc("c"),
      });
    }
  };

  render() {
    let {
      location,
      weather,
      temperature,
      imageBackground,
      wind,
      humidity, 
      visibility,
      predictability,
      loading,
      error,
    } = this.state;
    if (!imageBackground) {
      imageBackground = getImageBackgroundSrc("c");
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : (
          <ImageBackground
            source={imageBackground}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              <Text style={[styles.largeText, styles.textStyle]}>
                {location}
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>
                {temperature}°
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                {weather ? weather : ""}
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                wind speed: {wind} km/h
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
              visibility: {visibility} km
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
              Humidity: {humidity} %
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
              Predictability: {predictability} %
              </Text>
              <View style={styles.search}>
                <SearchInput
                  searchPlaceHoder={"Chercher votre ville"}
                  onSubmit={this.onSubmit}
                />
              </View>
              {/* <GeoLocation /> */}
            </View>
          </ImageBackground>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },

  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  search: {
    marginTop: 150,
  },
});

export default registerRootComponent(App); // this is how I register the App component
