import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItem(key) {
    const data = await AsyncStorage.getItem(key).then(item => item || null);
    return data != null ? JSON.parse(data) : null;
}

async function setItem(key, value) {
    return await AsyncStorage.setItem(key, JSON.stringify(value) || null);
}

async function deleteItem(key) {
    return await AsyncStorage.removeItem(key);
}

export const LMStorageService = {
    getItem,
    setItem,
    deleteItem,
};
