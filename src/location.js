import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class GeoLocation extends Component {
	state = {
		location: null
	};

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.findCoordinates}>
					<Text style={styles.welcome}>Où suis-je ?</Text>
					<Text>Location: {this.state.location}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'pink'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
})