import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { ClinicsScreen, LoginScreen, SignupScreen, Welcome, CommunityScreen } from "./components/Screens";
import { NavigationContainer } from "@react-navigation/native";
import { avatars, databases, account, ID } from "./components/DataBases/appwrite";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, useNavigation } from '@react-navigation/native';
import { Header } from './components/Header';
import 'react-native-url-polyfill/auto';
import { Button } from './components/Buttons';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [streakCount, setStreakCount] = useState(0);
  const [userId, setUserId] = useState("");

  // to get the user's avatar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // get user's data
        const userData = await account.get();
        setUserId(userData.$id);
        setUserName(userData.name);

        const avatar = avatars.getInitials(userData.name);
        // Ensure avatar's URL is valid
        setAvatarUrl(avatar.href || avatar);

        calculateStreak(userData.registration);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
// streak calculation based on joining + current dates
  const calculateStreak = (registrationDate) => {
    const joinDate = new Date(registrationDate);
    const today = new Date();
    
    const diffTime = today - joinDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setStreakCount(diffDays + 1);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigation.replace("Welcome") ;
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // rendered page
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.profileContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
        ) : (
          <Text>Loading Avatar...</Text>
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>🔥 Daily Streak: {streakCount} days</Text>
      </View>
      <Button onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Button>
    </View>
  );
};

// Stack handling the authorization of the user
const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Welcome" >
      <AuthStack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }} />
      <AuthStack.Screen name="Sign-up" component={SignupScreen}  options={{ headerShown: false }} />
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();


function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Clinics') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }}  />
      <Tab.Screen name="Clinics" component={ClinicsScreen}  options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

// Stack handling app screens
const AppStack = createNativeStackNavigator();

export function AppStackScreen() {
  return (
    <AppStack.Navigator initialRouteName='Main'>
      <AppStack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
      <AppStack.Screen name="Sign-up" component={SignupScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Login" component={LoginScreen } options={{ headerShown: false }}/>
      <AppStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Clinics" component={ClinicsScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    </AppStack.Navigator>
  );
}


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);

  // Check for existing user session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        // console.log("Found existing user session:", user.name);
        setUserSession(user);
      } catch (error) {
        console.log("No session found:", error.message);
        setUserSession(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        {userSession ? <AppStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D4C2FC",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  mainHeader: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#06b6d4",
    textTransform: "uppercase"
  },
  header:{
    marginBottom: 15,
    fontSize: 16,
    color: "#374151",
  },
  logo: {
    width: "80%",
    height: "15%"
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    margin : "20px"
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: "#130A52"
  },
  streakContainer: {
    backgroundColor: '#5A47DE',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  // logoutButton: {
  //   position: 'absolute',
  //   bottom: 50,
  //   backgroundColor: '#5A47DE',
  //   width: "88%",
  //   paddingVertical: 12,
  //   paddingHorizontal: 40,
  //   borderRadius: 8,
  // },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default App;