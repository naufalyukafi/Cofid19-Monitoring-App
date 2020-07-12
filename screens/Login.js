import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'

function Login(props) {

	// const currentUser = useSelector(state => state.currentUser)

	const dispatch = useDispatch()


	// const user = {name: "Rei"}

	const [username, setUsername] = useState({ name: "" })

	const [state, setState] = useState({
		password: '',
		isError: false,
	});

	useEffect(() => {
		dispatch(allActions.userActions.setUser(username))
	}, [])

	const loginHandler = () => {
		if (state.password == '1234') {
			dispatch(allActions.userActions.setUser(username))
			props.navigation.navigate('Dashboard')
		} else {
			setState({ isError: true })
		}
	};
	return (
		<ImageBackground style={styles.background} source={require('../assets/bg.jpg')}>
			<View style={styles.container}>
				<View style={styles.loginHeader}>
					<Text style={styles.loginTitle1}>COVID19</Text>
					<Text style={styles.loginTitle2}>Monitoring</Text>
				</View>
				<View style={styles.loginBody}>
					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<MaterialCommunityIcons name="account-outline" style={styles.green} size={40} />
							<View>
								<Text style={styles.labelText}>Username</Text>
								<TextInput
									style={styles.textInput}
									placeholder="Masukkan Nama Username"
									onChangeText={(userName) => setUsername({ name: userName })}
								/>
							</View>
						</View>

						<View style={styles.inputContainer}>
							<MaterialCommunityIcons name="lock-outline" style={styles.green} size={40} />
							<View>
								<Text style={styles.labelText}>Password</Text>
								<TextInput
									style={styles.textInput}
									placeholder="Masukkan Password"
									onChangeText={(password) => setState({ password })}
									secureTextEntry={true}
								/>
							</View>
						</View>
						<Text style={state.isError ? styles.errorText : styles.hiddenErrorText}>Password Salah</Text>
						<TouchableOpacity style={[styles.button, styles.bgGreen]} onPress={() => loginHandler()}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	green: {
		color: '#27AE60',
	},
	bgGreen: {
		backgroundColor: '#27AE60',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	formContainer: {
		justifyContent: 'center',
	},
	loginHeader: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	loginBody: {
		width: '90%',
	},
	loginTitle1: {
		fontSize: 50,
		fontWeight: 'bold'
	},
	loginTitle2: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	button: {
		display: 'flex',
		height: 50,
		width: '100%',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',

		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 0 },
		shadowRadius: 20,
	},
	buttonText: {
		fontSize: 24,
		color: '#fff',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 16,
	},
	textInput: {
		width: 300,
		backgroundColor: 'white',
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		marginBottom: 16,
	},
	hiddenErrorText: {
		color: 'transparent',
		textAlign: 'center',
		marginBottom: 16,
	},
});

export default Login;
