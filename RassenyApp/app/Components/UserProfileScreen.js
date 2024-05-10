import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const UserProfileScreen = ({ user, onClose }) => {
  const [avatarSource, setAvatarSource] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setAvatarSource(source);
      }
    });
  };

  const uploadImage = () => {
    
    Alert.alert('Upload Success', 'Image has been uploaded successfully!');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={selectImage}>
              {avatarSource ? (
                <Image source={avatarSource} style={styles.avatar} />
              ) : (
                <Text style={styles.selectImageText}>Select Image</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
          {avatarSource && (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: window.height,
    width: window.width / 3,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 10,
  },
  selectImageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfileScreen;
