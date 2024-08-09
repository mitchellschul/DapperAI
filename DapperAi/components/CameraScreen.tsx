import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraView, CameraType, CameraCapturedPicture } from "expo-camera";
// import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';



export default function App() {
    let cameraRef = useRef<CameraView>(null);
    const [hasCameraPermissions, setHasCameraPermissions] = useState<boolean | undefined>();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | undefined>();
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermissions(cameraPermissions.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermissions.status === "granted");
        })();
    }, []);

    if (hasCameraPermissions === undefined) {
        return <Text>Request Permissions</Text>
    } else if (!hasCameraPermissions) {
        return <Text>Permission for camera not granted. Please change in settings.</Text>
    }



    let takePicture = async () => {
        console.log('pictue captured')
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        if (cameraRef.current) {
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    }

    if (photo) {
        // let sharePic = () => {
        //     shareAsync()
        // };

        let savePic = () => {
            // SAVE TO DB FROM HERE????
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined)
            })
        }

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

                {/* <Button title="Share" onPress={sharePic} /> */}
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePic} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.container} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <Button title="Take Picture" onPress={takePicture}></Button>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 400,
        justifyContent: 'center',
    },

    buttonContainer: {
        backgroundColor: "#EEE",
        alignSelf: 'baseline',
        bottom: -250,
        left: 140
    },
    preview: {
        height: 400,
        width: 400,
        justifyContent: 'center',

    }

});
