import {AsyncStorage} from "react-native";

export const PRODUCT_STORAGE = {
    SAVE_PRODUCT: async (userId, data) => {
        return await AsyncStorage.setItem(`PRODUCT_INVENTORY_${userId}`, JSON.stringify(data));
    },

    GET_PRODUCT: async (userId) => {
        let data = await AsyncStorage.getItem(`PRODUCT_INVENTORY_${userId}`);
        return data != undefined ? JSON.parse(data) : data;
    }
}