import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-elements';
import { storage, databases, account, ID } from "../DataBases/appwrite.js";
import AchievementCard from '../AchievementCard/achivementCard.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../Buttons/';
import { Header } from "../Header";

const CommunityScreen = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchAchievements();
    fetchImages();
  }, []);

// fetches achievements from achievements collection
  const fetchAchievements = async () => {
    try {
      const response = await databases.listDocuments(
        '67b39a85001c96f3a9b8', 
        '67b4b8fe00043727112e',
      );
      setAchievements(response.documents);
    } catch (error) {
      console.error('Fetching achievements failed:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await storage.listFiles('67c34484002edb016035'); // Replace with your bucket ID
      setImages(response.files);
    } catch (error) {
      console.error('Fetching images failed:', error);
    }
  };

  const addAchievement = async () => {
    if (!title || !description) return;

    // Select a random image from appwrite storage
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageUrl = storage.getFileView('67c34484002edb016035', randomImage.$id);

    try {
      const user = await account.get();
      // console.log(user);
      // creates the achievement
      await databases.createDocument(
        '67b39a85001c96f3a9b8',
        '67b4b8fe00043727112e',
        ID.unique(),
        {
          "Title": title,
          "Description" : description,
          "imageUrl" : imageUrl,
          "userName": user.name,
        }
      );
      setTitle('');
      setDescription('');

      fetchAchievements();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Adding achievement failed:', error);
    }
  };

  return (
    <View style={styles.container}>
    <Header />
    {/* Displays the community */}
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <AchievementCard achievement={item} />}
        />
    </ScrollView>
    {/* floating action button to upload achievements using a modal */}
      <FAB
        placement="left"
        title="+"
        onPress={() => setIsModalVisible(true)}
        style={styles.fab}
      />
      {/* To upload achievements */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Achievement</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button onPress={addAchievement}>
            Submit
          </Button>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:"#D4C2FC" },
  achievementCard: { padding: 10, borderBottomWidth: 1 },
  achievementTitle: { fontWeight: 'bold', fontSize: 16 },
  image: { width: '60%', height: 50, marginTop: 10 },
  fab: { position: 'absolute', bottom: 20, left: 20 },
  modalContent: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: "#D4C2FC" },
  modalTitle: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  cancelButton: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default CommunityScreen ;