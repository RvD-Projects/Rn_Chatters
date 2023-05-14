import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storevalue(key, value) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("AsyncStore->storeValue:", error);
  }
};

export async function getValue(key) {
  try {
    return (value = await AsyncStorage.getItem(key));
  } catch (error) {
    console.error("AsyncStore->getValue:", error);
  }
};

export async function storeObject(key, object) {
  try {
    const jsonValue = JSON.stringify(object);
    return await storevalue(key, jsonValue);
  } catch (error) {
    console.error("AsyncStore->storeObject:", error);
  }
};

export async function updateObject(key, object) {
  try {
    return await AsyncStorage.mergeItem(key, JSON.stringify(object));
  } catch (error) {
    console.error("AsyncStore->storeObject:", error);
  }
};

export async function getObject(key) {
  try {
    return JSON.parse(await getValue(key));
  } catch (error) {
    console.error("AsyncStore->getObject:", error);
  }
};

export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error("AsyncStore->removeItem:", error);
  }
};

export async function getKeys() {
  try {
    return await AsyncStorage.getAllKeys() ?? [];
  } catch (error) {
    console.error("AsyncStore->getKeys:", error);
  }
};

export async function clear() {
  try {
    return await AsyncStorage.clear()
  } catch (error) {
    console.error("AsyncStore->clear:", error);
  }
};
