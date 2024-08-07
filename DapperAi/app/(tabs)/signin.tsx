import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ParallaxScrollView from '../../components/ParallaxScrollView';

export default function SignIn() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        >
            <TouchableOpacity style={styles.button}>
                <Text>Sign In</Text>
            </TouchableOpacity>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A1CEDC',
        padding: 10,
        borderRadius: 5,
    },
});