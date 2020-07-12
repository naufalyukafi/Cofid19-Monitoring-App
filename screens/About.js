import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
const About = () => {
    return (

        <View style={styles.container}>
            <View style={styles.dev}>
                <Text style={styles.devText}>WE ARE DEVELOPER </Text>
                <Text style={styles.devText}>Stay save ! </Text>
            </View>
            <View style={styles.locationContainer}>
                <View style={styles.box}>
                    <Image source={require('../assets/dito.png')} style={styles.avatar} />
                    <Text style={styles.nameProfile}>Dito Cahya</Text>
                    <View style={styles.locationContainer}>
                        <FontAwesome name="map-marker" size={30} color="#27AE60" />
                        <Text style={styles.location}>Kepanjen, Malang</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <Image source={require('../assets/yukafi.png')} style={styles.avatar} />
                    <Text style={styles.nameProfile}>Naufal Yukafi</Text>
                    <View style={styles.locationContainer}>
                        <FontAwesome name="map-marker" size={30} color="#27AE60" />
                        <Text style={styles.location}>Senduro, Lumajang</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                    <View style={styles.hr} />
                    <Image source={require('../assets/dito.png')} style={styles.avatar2} />
                </View>

                <View style={styles.aboutContainer}>
                    <Text style={styles.about}>About Me</Text>
                    <Text style={styles.descAbout}>
                        Iam fullstack developer, i have advantages can work in punishment. As you know i can typing fast
                    </Text>
                    <Text style={styles.devText2}>Portfolio</Text>
                    <View>
                        <View style={styles.portfolioContainer}>
                            <FontAwesome name="gitlab" size={30} color="#27AE60" />
                            <Text style={styles.portfolio}>@DitoCahyaPratama</Text>
                        </View>
                        <View style={styles.portfolioContainer}>
                            <FontAwesome name="github" size={30} color="#27AE60" />
                            <Text style={styles.portfolio}>@DitoCahyaPratama</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                    <View style={styles.hr} />
                    <Image source={require('../assets/yukafi.png')} style={styles.avatar2} />
                </View>

                <View style={styles.aboutContainer}>
                    <Text style={styles.about}>About Me</Text>
                    <Text style={styles.descAbout}>
                        I like mobile development and web developers. If you are interested in my skills, please visit the portfolio below
                    </Text>
                    <Text style={styles.devText2}>Portfolio</Text>
                    <View>
                        <View style={styles.portfolioContainer}>
                            <FontAwesome name="gitlab" size={30} color="#27AE60" />
                            <Text style={styles.portfolio}>@Naufal_yukafi</Text>
                        </View>
                        <View style={styles.portfolioContainer}>
                            <FontAwesome name="github" size={30} color="#27AE60" />
                            <Text style={styles.portfolio}>@Naufal_yukafi</Text>
                        </View>

                    </View>

                </View>

            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 51,
        borderColor: 'white',
    },
    avatar2: {
        height: 100,
        width: 100,
        borderRadius: 51,
        position: 'absolute'
    },
    dev: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    box: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    devText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    devText2: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
        marginTop: 50,
        alignItems: 'center'
    },
    profile: {
        borderRadius: 100,
        width: 160,
        height: 160,
    },
    nameProfile: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    },
    locationContainer: {
        flexDirection: 'row',
        // marginHorizontal: 15,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    location: {
        padding: 5,
        color: '#27AE60',
        fontSize: 14,
        fontWeight: 'bold'
    },
    aboutContainer: {
        paddingHorizontal: 30,
        marginTop: 12,
        marginBottom: 10
    },
    about: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18,
    },
    descAbout: {
        fontSize: 14,
        color: '#000000',
        marginTop: 10
    },
    portfolioContainer: {
        flexDirection: 'row',
        margin: 5,
    },
    portfolio: {
        padding: 5,
    },
    hr: {
        height: 100,
        width: '100%',
        backgroundColor: '#27AE60',
        marginTop: 20
    }

})


export default About