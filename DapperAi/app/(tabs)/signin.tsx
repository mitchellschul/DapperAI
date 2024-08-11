import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function SignIn(props: any) {

    const [userData, setUserData] = useState<any>({
        email: "",
        password: "",
        username: "",
        fullName: "",
    });
    const [signUp, setSignUp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {navigation} = props;

    const toggleSignUp = (signUp: boolean) => {
        setSignUp(!signUp);
    };

    const handleSignUp = async () => {
        setLoading(true);
        console.log(userData);
        try {
            const credentials = await createUserWithEmailAndPassword(FIREBASE_AUTH, userData.email, userData.password);
            const user = credentials.user;
            if (!user) {
                throw new Error("User not found after sign up");
            }
            const uid = user.uid;
            console.log("New user signed up with UID:", uid);
            try {
                const userCollectionRef = ref(FIREBASE_DB, "users/" + user.uid);
                await set(userCollectionRef, {
                    fullName: userData.fullName,
                    username: userData.username,
                });
                console.log("User item created successfully");

            }
            catch (error) {
                console.error('Error creating collection reference:', error);
            }
        }
        catch (error: any) {
            console.error('Authentication error:', error.message);
        }
        finally {
            setLoading(false); // Replace 'SomeScreen' with the actual screen name you want to navigate to
            setTimeout(() => {
                setLoading(true);
            }, 5000);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const db = getDatabase();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
    
                const user = result.user;
    
                // Get additional user info
            const additionalUserInfo: any = getAdditionalUserInfo(result);
            const firstName = additionalUserInfo.profile.given_name;
            const lastName = additionalUserInfo.profile.family_name;
    
            // Save the user's first name and last name in Firebase Realtime Database
            //const userRef = ref(db, 'users/' + user.uid);
            set(ref(db, 'users/' + user.uid), {
                firstname: firstName,
                lastname: lastName,
                
            });
            }) .catch((error) => {
                const errorCode = error.code;
                const email = error.customData ? error.customData.email : null;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            })
    };

    const handleLogin = async () => {
        try {
            const credentials = await signInWithEmailAndPassword(FIREBASE_AUTH, userData.email, userData.password);
        }
        catch (error: any) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        >
            {signUp ?
                <>
                    <View>
                        <Text style={styles.title}>
                            Welcome to DapperAI, AI SWAG ON DEMAND
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                        <Text style={{ fontSize: 20 }}>
                            Login In with Google
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <TextInput placeholder="Email" placeholderTextColor="black" keyboardType="email-address" style={styles.input} onChangeText={(text) => setUserData({ ...userData, email: text })} />
                        <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="black" style={styles.input} onChangeText={(text) => setUserData({ ...userData, password: text })} />
                        <TextInput placeholder="Username" placeholderTextColor="black" style={styles.input} onChangeText={(text) => setUserData({ ...userData, username: text })} />
                        <TextInput placeholder="Full Name" placeholderTextColor="black" style={styles.input} onChangeText={(text) => setUserData({ ...userData, fullName: text })} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => toggleSignUp(signUp)}>
                        <Text>Dont have an Account?</Text>
                    </TouchableOpacity>
                </>
                :
                <>
                    <View>
                        <Text style={styles.title}>
                            Welcome Back, Valued Customer
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                        <Text style={{ fontSize: 20 }}>
                            <AntDesign name="google" size={24} color="black" /> Login In with Google
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <TextInput placeholder="Email" placeholderTextColor="black" style={styles.input} />
                        <TextInput placeholder="Password" placeholderTextColor="black" style={styles.input} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => toggleSignUp(signUp)}>
                        <Text>Dont have an Account?</Text>
                    </TouchableOpacity>
                </>
            }

        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A1CEDC',
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 30,
    },
    input: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 10,
        width: 300,
        margin: 10,
        color: "black",

    },
    googleButton: {
        backgroundColor: '#A1CEDC',
        padding: 10,
        margin: 10,
        borderRadius: 12,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',
    },
});