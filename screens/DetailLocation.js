import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, FlatList, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Icon from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import * as theme from '../theme';

import Map from '../data/map.json';

const scrollX = new Animated.Value(0);

class DetailLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {
				country: 'Afghanistan',
				continent: 'Asia',
				latitude: 33,
				longitude: 65,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			provinsi: [],
			datas: [
				{
					id: 1,
					name: 'Kritis',
					total: 811,
				},
				{
					id: 2,
					name: 'Meninggal',
					total: 75,
				},
				{
					id: 3,
					name: 'Sembuh',
					total: 788,
				},
				{
					id: 4,
					name: 'Meninggal Hari ini',
					total: 10,
				},
			],
			markers: [],
		};
	}

	onRegionChange = (region) => {
		if (region[0]) {
			console.log(region[1]);
			this.setState({
				region: {
					country: region[1].attributes.Provinsi,
					continent: 'Indonesia',
					latitude: region[0][0].lat,
					longitude: region[0][0].long,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				},
				datas: [
					{
						id: 1,
						name: 'Positif',
						total: region[1].attributes.Kasus_Posi,
					},
					{
						id: 2,
						name: 'Mati',
						total: region[1].attributes.Kasus_Meni,
					},
					{
						id: 3,
						name: 'Sembuh',
						total: region[1].attributes.Kasus_Semb,
					},
				],
			});
		} else {
			let latitude = region.countryInfo.lat;
			let longitude = region.countryInfo.long;
			this.setState({
				region: {
					country: region.country,
					continent: region.continent,
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				},
				datas: [
					{
						id: 1,
						name: 'Kritis',
						total: region.critical,
					},
					{
						id: 2,
						name: 'Mati',
						total: region.deaths,
					},
					{
						id: 3,
						name: 'Sembuh',
						total: region.recovered,
					},
					{
						id: 4,
						name: 'Mati Hari ini',
						total: region.todayDeaths,
					},
				],
			});
		}
	};

	componentDidMount = () => {
		let location = this.props.route.params;
		// console.log(location);
		if (location.location[0]) {
			if (location.location[0][0]) {
				// console.log(location.location[0][0][0].provinsi)
				// console.log('salah');
				this.setState({
					region: {
						country: location.location[0][0][0].provinsi,
						continent: "Provinsi Indonesia",
						latitude: location.location[0][0][0].lat,
						longitude: location.location[0][0][0].long,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					},
				});
			} else {
				// console.log('benar');
				this.setState({
					region: {
						country: location.location[0].country,
						continent: location.location[0].continent,
						latitude: location.location[0].countryInfo.lat,
						longitude: location.location[0].countryInfo.long,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}
				})
			}
		} else {
			// console.log('helo');
			this.setState({
				region: {
					country: location.location.country,
					continent: location.location.continent,
					latitude: location.location.countryInfo.lat,
					longitude: location.location.countryInfo.long,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}
			})
		}
		this.fetchData();
		this.fetchProv();
	};

	fetchData = async () => {
		let response;
		try {
			response = await axios.get('https://disease.sh/v3/covid-19/countries');
			this.setState({ markers: response.data });
		} catch (e) {
			console.log(`Failed to fetch countries: ${e.message}`, e);
			return;
		}
	};

	fetchProv = async () => {
		let response;
		const mapping = [];
		const merges = [];
		Map.data.map((item) => {
			mapping.push(item);
		});
		try {
			response = await axios.get('https://api.kawalcorona.com/indonesia/provinsi/');
		} catch (e) {
			console.log(`Failed to fetch countries: ${e.message}`, e);
			return;
		}

		response.data.map((item) => {
			let merge = [];
			merge.push(
				mapping.filter((el) => {
					return el.provinsi == item.attributes.Provinsi;
				})
			);
			merge.push(item);
			merges.push(merge);
		});

		this.setState({
			provinsi: merges,
		});
	};

	renderDescriptions = () => {
		return (
			<View style={[styles.column, styles.descriptions, { paddingTop: 40 }]}>
				<FlatList
					horizontal
					pagingEnabled
					scrollEnabled
					showsHorizontalScrollIndicator={false}
					decelerationRate={0}
					scrollEventThrottle={16}
					snapToAlignment="center"
					style={{ overflow: 'visible' }}
					data={this.state.datas}
					keyExtractor={(item, index) => `${item.id}`}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {
						useNativeDriver: false,
					})}
					renderItem={({ item }) => this.renderDescription(item)}
				/>
			</View>
		);
	};

	renderDescription = (item) => {
		return (
			<View>
				<View style={styles.description}>
					<Text style={styles.descriptionName}>{item.name}</Text>
					<Text style={styles.descriptionTotal}>{item.total}</Text>
				</View>
			</View>
		);
	};

	renderList = () => {
		return (
			<View style={styles.detailList}>
				<Text style={styles.title}>Detail Lokasi : </Text>
				<View style={[styles.row, { alignItems: 'center' }]}>
					<Icon name="home" size={40} />
					<View style={(styles.column, { marginLeft: 20 })}>
						<Text style={styles.placeText}>{this.state.region.country}</Text>
						<Text style={styles.placeText}>{this.state.region.continent}</Text>
					</View>
				</View>
				<View>{this.renderDescriptions()}</View>
			</View>
		);
	};

	loopMap = () => {
		return this.state.markers.map((item, key) => (
			<Marker
				key={key}
				coordinate={{ latitude: item.countryInfo.lat, longitude: item.countryInfo.long }}
				title={item.country}
				description={item.continent}
				onPress={() => this.onRegionChange(item)}
			/>
		));
	};

	loopProvinsi = () => {
		return this.state.provinsi.map((item, key) => (
			<Marker
				key={key}
				coordinate={{ latitude: item[0][0].lat, longitude: item[0][0].long }}
				title={item[0][0].provinsi}
				description="Provinsi Indonesia"
				onPress={() => this.onRegionChange(item)}
			/>
			// console.log(item[1])
		));
	};

	render() {
		return (
			<View style={styles.container}>
				<MapView style={styles.mapStyle} initialRegion={this.state.region}>
					{this.loopMap()}
					{this.loopProvinsi()}
				</MapView>
				<ScrollView style={styles.scroll}>{this.renderList()}</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	column: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
	placeText: {
		fontSize: theme.sizes.font * 1.5,
	},
	title: {
		color: theme.colors.active,
		fontSize: theme.sizes.font * 2,
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 1.9,
	},
	detailList: {
		zIndex: 10,
		backgroundColor: theme.colors.white,
		borderRadius: theme.sizes.radius,
		padding: theme.sizes.padding,
	},
	scroll: {
		top: -10,
	},
	description: {
		backgroundColor: theme.colors.active,
		padding: 20,
		margin: 10,
		width: 200,
		height: 100,
		borderRadius: theme.sizes.radius,
	},
	descriptions: {
		marginTop: -20,
	},
	descriptionName: {
		color: theme.colors.white,
		fontSize: 18,
		fontWeight: 'bold',
	},
	descriptionTotal: {
		color: theme.colors.white,
		fontSize: 36,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});

export default DetailLocation;