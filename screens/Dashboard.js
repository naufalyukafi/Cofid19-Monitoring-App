import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Animated,
	FlatList,
	Dimensions,
	ImageBackground,
	Picker,
} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux'

import * as theme from '../theme';

import advertisement from '../data/iklan.json';

const { width, height } = Dimensions.get('window');

function Dashboard(props) {
	const currentUser = useSelector(state => state.currentUser)
	const scrollX = new Animated.Value(0);
	const data = advertisement.ads;

	const [username, setUsername] = useState(currentUser.user.name);
	const [country, setCountry] = useState([]);
	const [location, setLocation] = useState('Indonesia');

	const [mati, setMati] = useState(0);
	const [sembuh, setSembuh] = useState(0);

	const logoutHandler = () => { };

	useEffect(() => {
		const fetchData = async () => {
			let response;
			try {
				response = await axios.get('https://disease.sh/v3/covid-19/countries');
				setCountry(response.data);
			} catch (e) {
				console.log(`Failed to fetch countries: ${e.message}`, e);
				return;
			}
		};
		fetchData();
	}, []);

	const renderDots = () => {
		const dotPosition = Animated.divide(scrollX, width);
		return (
			<View style={[styles.flex, styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 10 }]}>
				{data.map((item, index) => {
					const borderWidth = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0, 2.5, 0],
						extrapolate: 'clamp',
					});
					return (
						<Animated.View
							key={`step-${item.id}`}
							style={[styles.dots, styles.activeDot, { borderWidth: borderWidth }]}
						/>
					);
				})}
			</View>
		);
	};
	const renderAdvertisements = (props) => {
		return (
			<View style={[styles.column, styles.advertisements, { paddingTop: 40 }]}>
				<FlatList
					horizontal
					pagingEnabled
					scrollEnabled
					showsHorizontalScrollIndicator={false}
					decelerationRate={0}
					scrollEventThrottle={16}
					snapToAlignment="center"
					style={{ overflow: 'visible', height: 280 }}
					data={data}
					keyExtractor={(item, index) => `${item.id}`}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
						useNativeDriver: false,
					})}
					renderItem={({ item }) => renderAdvertisement(item)}
				/>
				{renderDots()}
			</View>
		);
	};
	const renderAdvertisement = (item) => {
		return (
			<TouchableOpacity onPress={() => props.navigation.navigate('DetailAds', { article: item })}>
				<ImageBackground
					style={[styles.flex, styles.ads, styles.shadow]}
					imageStyle={{ borderRadius: theme.sizes.radius }}
					source={{ uri: item.preview }}
				>
					<View style={[styles.row, { justifyContent: 'space-between' }]}>
						<View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
							<Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.user.name}</Text>
							<Text style={{ color: theme.colors.white }}>
								<Octicons name="location" size={theme.sizes.font * 0.8} color={theme.colors.white} />
								<Text> {item.location}</Text>
							</Text>
						</View>
						<View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
							<Text style={styles.rating}>{item.rating}</Text>
						</View>
					</View>
				</ImageBackground>
				<View style={[styles.column, styles.adsInfo, styles.shadow]}>
					<Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8 }}>
						{item.title}
					</Text>
					<View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end' }]}>
						<Text style={{ color: theme.colors.caption }}>
							{item.description.split('').slice(0, 50)}...
						</Text>
						<FontAwesome name="chevron-right" size={theme.sizes.font * 0.75} color={theme.colors.caption} />
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	const renderLocation = () => {
		const { navigation } = props;
		return (
			<View style={{ paddingBottom: 30 }}>
				<View
					style={[styles.detailLocation, styles.shadow, styles.row, { backgroundColor: theme.colors.gray }]}
					imageStyle={{ borderRadius: theme.sizes.radius }}
				>
					<View
						style={[
							styles.column,
							{
								backgroundColor: theme.colors.white,
								padding: theme.sizes.padding,
								borderRadius: theme.sizes.radius,
								marginRight: 10,
							},
						]}
					>
						<Text>Meninggal</Text>
						<Text
							style={{ fontSize: theme.sizes.font * 2, fontWeight: 'bold', color: theme.colors.active }}
						>
							{mati}
						</Text>
					</View>
					<View
						style={[
							styles.column,
							{
								backgroundColor: theme.colors.white,
								padding: theme.sizes.padding,
								borderRadius: theme.sizes.radius,
								marginLeft: 10,
							},
						]}
					>
						<Text>Sembuh</Text>
						<Text
							style={{ fontSize: theme.sizes.font * 2, fontWeight: 'bold', color: theme.colors.active }}
						>
							{sembuh}
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={[
						styles.column,
						styles.detailLocationInfo,
						styles.shadow,
						{ backgroundColor: theme.colors.active },
					]}
					onPress={() => props.navigation.navigate('DetailLocation', { location: location })}
				>
					<Text style={{ fontSize: theme.sizes.font * 1.25, textAlign: 'center', color: theme.colors.white }}>
						Detail
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	const renderRecommendedLocation = () => {
		return (
			<View style={{ margin: theme.sizes.margin }}>
				<View>
					<Text style={styles.title}>Rekomendasi Lokasi</Text>
				</View>
				<View>
					<TouchableOpacity style={styles.recommendedLocation} onPress={() => props.navigation.navigate('DetailLocation',
						{
							location: country.filter((el) => {
								return el.countryInfo._id == 360
							})
						})}>
						<Text>Indonesia</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.recommendedLocation} onPress={() => props.navigation.navigate('DetailLocation',
						{
							location: country.filter((el) => {
								return el.countryInfo._id == 702
							})
						})}>
						<Text>Singapura</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	let dataPicker = country.map((item, key) => {
		return <Picker.Item label={item.country} value={item} key={key} />;
	});

	const updateSelected = (item) => {
		setLocation(item), setMati(item.deaths), setSembuh(item.recovered);
	};

	return (
		<View style={styles.container}>
			<View style={styles.dashboardHeader}>
				<View style={styles.headerKiri}>
					<Text style={styles.findLocation}>Cari Lokasi</Text>
					<Picker
						selectedValue={location}
						style={{ height: 50, width: 150 }}
						onValueChange={(itemValue) => updateSelected(itemValue)}
					>
						{dataPicker}
					</Picker>
				</View>
				<View style={styles.headerKanan}>
					<Image
						source={{ uri: `https://api.adorable.io/avatars/64/${username}.png` }}
						style={styles.profile}
					/>
					<Text style={styles.name}>{username}</Text>
				</View>
			</View>
			<View style={styles.dashboardBody}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: theme.sizes.padding * 2 }}
				>
					{renderLocation()}
					{renderAdvertisements()}
					{renderRecommendedLocation()}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	green: {
		color: '#27AE60',
	},
	bgGreen: {
		backgroundColor: '#27AE60',
	},
	container: {
		flex: 1,
	},
	name: {
		fontWeight: 'bold'
	},
	dashboardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 40,
	},
	dashboardBody: {
		paddingTop: 40,
	},
	headerKiri: {
		justifyContent: 'center',
		textAlign: 'left',
	},
	headerKanan: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	profile: {
		borderRadius: 50,
		width: 48,
		height: 48,
	},
	findLocation: {
		fontWeight: 'bold',
		color: '#c4c4c4',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	flex: {
		flex: 0,
	},
	column: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
	header: {
		backgroundColor: theme.colors.white,
		paddingHorizontal: theme.sizes.padding,
		paddingTop: theme.sizes.padding * 1.33,
		paddingBottom: theme.sizes.padding * 0.66,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	advertisements: {
		flex: 1,
		justifyContent: 'space-between',
		paddingBottom: 0,
	},
	ads: {
		width: width - theme.sizes.padding * 2,
		height: width * 0.6,
		marginHorizontal: theme.sizes.margin,
		paddingHorizontal: theme.sizes.padding,
		paddingVertical: theme.sizes.padding * 0.66,
		borderRadius: theme.sizes.radius,
	},
	detailLocation: {
		width: width - theme.sizes.padding * 2,
		height: width * 0.5,
		marginHorizontal: theme.sizes.margin,
		justifyContent: 'center',
		paddingVertical: theme.sizes.padding * 1,
		borderRadius: theme.sizes.radius,
	},
	adsInfo: {
		position: 'absolute',
		borderRadius: theme.sizes.radius,
		paddingHorizontal: theme.sizes.padding,
		paddingVertical: theme.sizes.padding / 2,
		bottom: 20,
		left: (width - theme.sizes.padding * 4) / (Platform.OS === 'ios' ? 3.2 : 3),
		backgroundColor: theme.colors.white,
		width: width - theme.sizes.padding * 4,
	},
	detailLocationInfo: {
		position: 'absolute',
		borderRadius: theme.sizes.radius,
		paddingHorizontal: theme.sizes.padding,
		paddingVertical: theme.sizes.padding / 2,
		bottom: 0,
		left: (width - theme.sizes.padding * 4) / (Platform.OS === 'ios' ? 3.2 : 3),
		backgroundColor: theme.colors.white,
		width: width - theme.sizes.padding * 4,
	},
	avatar: {
		width: theme.sizes.padding,
		height: theme.sizes.padding,
		borderRadius: theme.sizes.padding / 2,
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.05,
		shadowRadius: 10,
		elevation: 5,
	},
	dots: {
		width: 10,
		height: 10,
		borderWidth: 2.5,
		borderRadius: 5,
		marginHorizontal: 6,
		backgroundColor: theme.colors.gray,
		borderColor: 'transparent',
	},
	activeDot: {
		width: 12.5,
		height: 12.5,
		borderRadius: 6.25,
		borderColor: theme.colors.active,
	},
	recommendedLocation: {
		backgroundColor: theme.colors.gray,
		padding: 20,
		margin: 5,
		borderRadius: theme.sizes.radius,
	},
});

export default Dashboard;
