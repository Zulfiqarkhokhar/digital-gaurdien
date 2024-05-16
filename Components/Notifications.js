import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

const notifications = [
  {
    id: '1',
    title: 'Geofencing',
    description: 'Child is out of region.',
  },
  {
    id: '2',
    title: 'Data Usage',
    description: 'Child has used exessive Data.',
  },
  {
    id: '3',
    title: 'Applications',
    description: 'Angry bird is Dangerous App.',
  },
  {
    id: '4',
    title: 'Screen Time',
    description: 'Child has used a lot time on Screen.',
  },
  {
    id: '5',
    title: 'Location',
    description: 'Check Child Current Location.',
  },
  // Add more notifications as needed
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);

  const handleDeleteNotification = id => {
    const updatedList = notificationList.filter(item => item.id !== id);
    setNotificationList(updatedList);
  };

  const renderNotificationItem = ({item}) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
        <Icon name="trash-o" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notificationList}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
    color: '#666',
  },
});
export default Notifications;
