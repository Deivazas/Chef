import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { db } from './firebaseConfig';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Reference to the "orders" collection in the database
      const ordersRef = ref(db, 'orders');

      // Fetch data from the database
      const snapshot = await get(ordersRef);

      // Extract the data from the snapshot
      if (snapshot.exists()) {
        const ordersData = Object.entries(snapshot.val()).map(([id, order]) => ({ id, ...order }));
        setOrders(ordersData);
      } else {
        console.log('No orders available');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      // Reference to the specific order in the "orders" collection
      const orderRef = ref(db, `orders/${orderId}`);

      // Update the status in the database
      await update(orderRef, { status });

      // Fetch orders again to reflect the changes
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      {orders.length > 0 ? (
        <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
              <Image source={{ uri: item.imageURL }} style={styles.orderImage} />
              <View style={styles.orderDetails}>
                <Text>Name: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Status: {item.status}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.pendingButton}
                  onPress={() => updateOrderStatus(item.id, 'Pending')}
                >
                  <Text>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.readyButton}
                  onPress={() => updateOrderStatus(item.id, 'Ready')}
                >
                  <Text>Ready</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No orders available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  pendingButton: {
    backgroundColor: 'yellow',
    padding: 8,
    marginRight: 8,
  },
  readyButton: {
    backgroundColor: 'green',
    padding: 8,
  },
});

export default OrdersScreen;
