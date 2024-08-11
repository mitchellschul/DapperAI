import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ItemCard from '@/components/ItemCard'

const WardrobeScreen: React.FC = () => {
  const items = [
    { id: 1, name: 'Green Tshirt', type: 'top', image: require('@/assets/tempimages/greenshirt.png') },
    { id: 2, name: 'Blue Tshirt', type: 'top', image: require('@/assets/tempimages/blueshirt.png') },
    { id: 3, name: 'Red Tshirt', type: 'top', image: require('@/assets/tempimages/redshirt.png') },
    { id: 4, name: 'Green Sweatshirt', type: 'outerwear', image: require('@/assets/tempimages/greenss.jpeg') },
    { id: 5, name: 'Gray Pants', type: 'bottoms', image: require('@/assets/tempimages/graypants.jpeg') },
    { id: 6, name: 'Blue Pants', type: 'bottoms', image: require('@/assets/tempimages/bluepants.jpeg') },
    { id: 7, name: 'Jorts', type: 'bottoms', image: require('@/assets/tempimages/jorts.jpeg') },
    { id: 8, name: 'Pink Socks', type: 'footware', image: require('@/assets/tempimages/socks.png') },
    { id: 9, name: 'Gray Dress Shoes', type: 'footware', image: require('@/assets/tempimages/shoes.png') },
    { id: 10, name: 'Watch', type: 'accessories', image: require('@/assets/tempimages/watch.png') },
    // Add more items as needed
  ];

  const itemTypes = [...new Set(items.map(item => item.type))];

  console.log(itemTypes)



  return (
    <SafeAreaView style={styles.container}>


      {/* Header with filters */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Wardrobe</Text>
      </View>



      {/* Wardrobe items */}
      <ScrollView contentContainerStyle={styles.grid}>
        <View>
          <ScrollView horizontal={true}>
            {itemTypes.map((type, index) => (
              <TouchableOpacity key={index} style={styles.circleButton}>
                <Text>{type[0]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
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
  circleButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 8
  }
});

export default WardrobeScreen;
