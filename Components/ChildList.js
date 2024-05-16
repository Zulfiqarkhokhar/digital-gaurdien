import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from './AuthContext';

const ChildList = ({navigation}) => {
  const [children, setChildren] = useState([]);

  const {token} = useAuth();

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await fetch(
          'https://digital-guardian-backend.vercel.app/api/parent/get-all-children',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const data = await response.json();
        console.log('response: ', data);
        setChildren(data.children);
      } catch (e) {
        console.log('Fetching child lis error', e);
      }
    };
    fetchChild();
  }, []);

  const handleChild = child => {
    console.log(child.name);
    console.log(child.id);
    const childId = child.id;
    navigation.navigate('ParentDashboard', {childId});
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#190152',
          width: 370,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Select Child
        </Text>
      </View>
      {children.length > 0 ? (
        <FlatList
          style={{width: '100%'}}
          data={children}
          keyExtractor={({id}, index) => id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleChild(item)}>
              <View
                style={{
                  padding: 20,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No children found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChildList;
