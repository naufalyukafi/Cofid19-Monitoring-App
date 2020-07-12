import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
import { useSelector } from 'react-redux';

import Map from '../data/map.json';

const About = (props) => {
	const currentUser = useSelector((state) => state.currentUser);
	const [provinsi, setProvinsi] = useState([]);
	const [username, setUsername] = useState(currentUser.user.name);
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([
		{
			id: 1,
			kodeProvi: 35,
			provinsi: 'Jawa Timur',
		},
		{
			id: 2,
			kodeProvi: 31,
			provinsi: 'DKI Jakarta',
		},
		{
			id: 3,
			kodeProvi: 73,
			provinsi: 'Sulawesi Selatan',
		},
		{
			id: 4,
			kodeProvi: 33,
			provinsi: 'Jawa Tengah',
		},
	]);
	useEffect(() => {
		const fetchData = async () => {
			let response;
			try {
				response = await axios.get('https://indonesia-covid-19.mathdro.id/api');
				setData2(response.data);
			} catch (e) {
				console.log(`Failed to fetch countries: ${e.message}`, e);
				return;
			}
		};
		fetchData();

		const fetchProv = async () => {
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

			setProvinsi({
				merges,
			});
		};

		fetchProv();
	}, []);
	const RenderItem = ({ item }) => {
		return (
			<FlatList
				data={data3}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.containerButtom}>
						<View style={styles.buttomText}>
							<Text style={styles.province}>{item.provinsi}</Text>
						</View>
						<View style={styles.buttomButton}>
							<TouchableOpacity
								style={styles.buttomSubmit}
								onPress={() =>
									props.navigation.navigate('DetailLocation', {
										location: provinsi.merges.filter((el) => {
											return el[0][0].id == item.id;
											// console.log(el[0][0].id)
										}),
									})
								}
							>
								<Text style={styles.submit}>Submit</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		);
	};
	const BodyProfile = () => {
		return (
			<>
				<View style={styles.containerPosition}>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Anda Berada Di Indonesia</Text>
					<Image
						source={{ uri: `https://api.adorable.io/avatars/64/${username}.png` }}
						style={{ width: 60, height: 60, borderRadius: 50 }}
					/>
				</View>
				<View style={styles.cardContainer}>
					<ScrollView horizontal>
						<View style={styles.card}>
							<Text style={styles.condition}>Positif</Text>
							<Text style={styles.sum}>{data2.jumlahKasus}</Text>
						</View>
						<View style={styles.card}>
							<Text style={styles.condition}>Sembuh</Text>
							<Text style={styles.sum}>{data2.sembuh}</Text>
						</View>
						<View style={styles.card}>
							<Text style={styles.condition}>Meninggal</Text>
							<Text style={styles.sum}>{data2.meninggal}</Text>
						</View>
					</ScrollView>
				</View>
				<View style={styles.containerButton}>
					<View style={styles.button1}>
						<Text style={styles.buttonText}>Tetap patuhi protokol kesehatan</Text>
						<AntDesign name="exclamationcircleo" size={25} color="black" />
					</View>
					<TouchableOpacity
						style={styles.buttonMap}
						onPress={() =>
							props.navigation.navigate('DetailLocation', {
								location: {
									country: 'Indonesia',
									countryInfo: {
										lat: -5,
										long: 120,
									},
									continent: 'Asia',
								},
							})
						}
					>
						<Text style={styles.buttonText2}>Lihat Map</Text>
					</TouchableOpacity>
				</View>
			</>
		);
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<BodyProfile />
				<View style={styles.containerBottomButton}>
					<RenderItem />
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerKanan: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		fontWeight: 'bold',
	},
	containerPosition: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
		paddingHorizontal: 20,
	},
	card: {
		width: 151,
		height: 105,
		backgroundColor: '#27AE60',
		borderRadius: 10,
		marginHorizontal: 20,
		marginTop: 40,
	},
	condition: {
		fontSize: 14,
		color: 'white',
		fontWeight: 'bold',
		paddingTop: 10,
		paddingLeft: 20,
	},
	sum: {
		textAlign: 'center',
		fontSize: 36,
		fontWeight: 'bold',
		color: 'white',
	},
	containerButton: {
		marginTop: 34,
		paddingHorizontal: 20,
	},
	button1: {
		width: '100%',
		height: 44,
		backgroundColor: '#E9D30C',
		borderRadius: 20,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	buttonText2: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonMap: {
		backgroundColor: '#fff',
		width: '100%',
		height: 54,
		borderWidth: 2,
		borderColor: '#27AE60',
		borderRadius: 20,
		marginTop: 47,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerBottomButton: {
		marginTop: 42,
		marginHorizontal: 20,
		backgroundColor: '#C4C4C4',
		marginBottom: 20,
		paddingBottom: 20,
		// flex: 1
	},
	containerButtom: {
		marginTop: 30,
		flexDirection: 'row',
		paddingHorizontal: 3,
	},
	buttomText: {
		width: '50%',
		height: 42,
		backgroundColor: '#fff',
		marginHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	province: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
	buttomSubmit: {
		width: 105,
		height: 42,
		backgroundColor: '#27AE60',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	submit: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
});

export default About;