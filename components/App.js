import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Ionicons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Main from './Main';
import Add from './Add';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#99a4d1'/> 
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="main"
          component={Main}
          options={{
            drawerIcon: () => <FontAwesome name="sticky-note" size={24} color="white" />,
            drawerLabel: 'Home', 
            headerTitle: 'Home',
            drawerLabelStyle: { color: 'white' },
            drawerActiveBackgroundColor: '#5a8ad1',
             headerStyle: { backgroundColor: '#5a8ad1' },
            headerTintColor: '#1e272e',
          }}
        />
        <Drawer.Screen
          name="add"
          component={Add}
          options={{
            drawerIcon: () => <Ionicons name="add-circle" size={24} color="white" />,
            drawerLabel: 'Add New',
            headerTitle: 'Add New',
            drawerLabelStyle: { color: 'white' },
            drawerActiveBackgroundColor: '#5a8ad1',
            headerStyle: { backgroundColor: '#5a8ad1' },
            headerTintColor: '#1e272e',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#01579b' }}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <MaterialCommunityIcons name="notebook-outline" size={72} color="white" /> */}

        <Image source={require("../assets/banner.png")} style={{ height: 70 , width:140}} />

      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="About Us"
        icon={() => <AntDesign name="infocirlce" size={24} color="white" />}
        onPress={() => alert('Designed & Developed by Kalyan Babu Kafle ')}
        labelStyle={{ color: 'white' }}
        activeBackgroundColor="#f6c689"
      />
    </DrawerContentScrollView>
  );
}