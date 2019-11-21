import { AsyncStorage } from 'react-native';

export async function storeData(name, data) {
    await AsyncStorage.setItem(name, JSON.stringify(data));
}

export async function readData(name) {
    return JSON.parse(await AsyncStorage.getItem(name));
}

export async function removeData(name) {
    await AsyncStorage.removeItem(name);
}
