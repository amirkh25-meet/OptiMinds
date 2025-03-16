import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { databases, ID} from "../DataBases/appwrite";
import { useState, useEffect } from 'react';

const AchievementCard = ({ achievement }) => {
  const [celebrations, setCelebrations] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  // sets the number of celebration(likes) without reseting to 0 when refreshing
  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        const response = await databases.getDocument(
          "67b39a85001c96f3a9b8",
          "67b4b8fe00043727112e",
          achievement.$id // The unique document ID in Appwrite
        );
        
        setCelebrations(response.Celebrations || 0);
      } catch (error) {
        console.error("Error fetching celebrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  const handleCelebrate = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    
    try {
      setCelebrations((prev) => prev + 1);
// updated # of celebrations
      await databases.updateDocument(
        "67b39a85001c96f3a9b8",
        "67b4b8fe00043727112e",
        achievement.$id,
        {
          Celebrations: celebrations + 1,
        }
      );

      // console.log("Celebration count updated!");
    } catch (error) {
      console.error("Error updating celebrations:", error);
      setCelebrations((prev) => prev - 1);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View>
    <View style={styles.card}>

      <View style={styles.contentRow}>
      <View>
      <Text style={styles.userName}>{achievement.userName}</Text>
      {/* Achievement Content */}
      <Text style={styles.achievementTitle}>{achievement.Title}</Text>
      <Text style={styles.achievementDescription}>{achievement.Description}</Text>
      </View>
        <Image source={{ uri: achievement.imageUrl }} style={styles.achievementImage} />
    </View>
    </View>
    {/* Celebration buttom */}
      <TouchableOpacity style={styles.celebrateButton} onPress={handleCelebrate} disabled={isUpdating}>
          <FontAwesome name="heart" size={20} color="white" />
          <Text style={styles.celebrateText}>{celebrations} Celebrate</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 5,
  },
  userName: {
    color:"#100850",
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    paddingLeft: 7
  },
  achievementTitle: {
    color:"#100850",
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    paddingLeft: 5
  },
  achievementDescription: {
    color:"#100850",
    marginBottom: 12,
    paddingLeft: 5

  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  achievementImage: {
    width: 50,
    height: 50,
  },
  celebrateButton: {
    backgroundColor: '#5A47DE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 15,
    width: "45%"
  },
  celebrateText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default AchievementCard;
