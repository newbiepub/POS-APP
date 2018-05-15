import {AsyncStorage} from "react-native";

export const CATEGORY_STORAGE = {
    SAVE_CATEGORY: async (userId, data) => {
        return await AsyncStorage.setItem(`CATEGORY_INVENTORY_${userId}`, JSON.stringify(data));
    },

    GET_CATEGORY: async (userId) => {
        let data = await AsyncStorage.getItem(`CATEGORY_INVENTORY_${userId}`);
        return data != undefined ? JSON.parse(data) : data;
    }
}