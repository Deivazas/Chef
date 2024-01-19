import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref as dbRef, onValue, remove as dbRemove } from 'firebase/database';

const MenuItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageURL }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    );
  };
  
  

const MenuScreen = () => {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const itemsRef = dbRef(database, 'items');

    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const items = snapshot.val();
      if (items) {
        const itemList = Object.keys(items).map((key) => ({ ...items[key], id: key }));
        setMenuItems(itemList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveItem = async (item) => {
    try {
      const database = getDatabase();
      const itemsRef = dbRef(database, 'items');

      // Use the item's ID to create a reference and remove it
      await dbRemove(dbRef(itemsRef, item.id));
      console.log('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };

  const handleAddItem = () => {
    navigation.navigate('AddItem');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} onRemoveItem={handleRemoveItem} />}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 8,
      },
      imageContainer: {
        marginRight: 16,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 8,
      },
      infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      description: {
        fontSize: 18,
        marginBottom: 4,
      },
      price: {
        fontSize: 16,
        color: 'green',
      },
    });

export default MenuScreen;
