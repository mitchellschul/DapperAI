import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraView, CameraType, CameraCapturedPicture } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { getApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import DropDownPicker from "react-native-dropdown-picker";

export default function App() {
    let cameraRef = useRef<CameraView>(null);
    const db = getDatabase();
    const [hasCameraPermissions, setHasCameraPermissions] = useState<boolean | undefined>();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | undefined>();
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
    const [photoId, setPhotoId] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Outterware', value: 'outterware' },
        { label: 'Footware', value: 'footware' },
        { label: 'Accessories', value: 'accessories' },
    ]);

    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

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
        setPhotoId(photoId + 1);

        if (cameraRef.current) {
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    }

    if (photo) {
        let savePic = async () => {
            try {
                if (!photo) {
                    console.error("No photo available to save.");
                    return;
                }
        
                const storagePath = `images/${photoId}.jpg`;
                console.log("Storage path:", storagePath);
        
                const storageReference = storageRef(storage, storagePath);
                console.log("Storage reference created:", storageReference);
        
                // Fetch the photo URI and convert it to a blob
                const response = await fetch(photo.uri);
                console.log("Fetched photo URI:", response);
        
                const blob = await response.blob();
                console.log("Created blob from photo URI:", blob);
        
                // Upload the blob to Firebase Storage
                await uploadBytes(storageReference, blob);
                console.log("Uploaded blob to Firebase Storage");
        
                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageReference);
                console.log("Retrieved download URL:", downloadURL);
        
                // Save the download URL and other details to Firebase Realtime Database
                const userImageRef = databaseRef(db, `images/${photoId}`);
                await set(userImageRef, {
                    photoUrl: downloadURL,
                    type: value,
                });
                console.log("Saved image details to Firebase Realtime Database");
        
                // Optionally, save the photo to the device's media library
                await MediaLibrary.saveToLibraryAsync(photo.uri);
                console.log("Photo saved to device's media library");
        
                // Reset the photo state to allow taking another picture
                setPhoto(undefined);
                console.log("Photo state reset successfully!");
        
            } catch (error) {
                console.error("Error saving photo:", error);
            }
        };
        

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePic} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
                <View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
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
            <View></View>
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
