import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ItemCardProps {
    item: {
        id: number;
        name: string;
        image: any;
    };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default ItemCard;
