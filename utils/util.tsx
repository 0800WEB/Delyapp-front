import AsyncStorage from "@react-native-async-storage/async-storage";

export const _storeData = async ({
  key,
  value,
}: {
  key: string;
  value: any;
}) => {
  try {
    value = JSON.stringify(value);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const _retrieveData = async ({ key }: { key: string }) => {
  try {
    let value = await AsyncStorage.getItem(key);
    value = value ? JSON.parse(value) : null;
    return value;
  } catch (error) {
    console.log(error);
  }
};

export const _removeData = async ({ key }: { key: string }) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const parseError = async ({ error }: { error: any }) => {
  let newError: { [key: string]: any } = {};
  let pathArray = [];
  if (error.response.status !== 401) {
    for (let item of error.response.data.message) {
      if (Array.isArray(item.path) && item.path.length > 1) {
        pathArray.push(item.path[1]);
      }
      newError[item.path] = item.message;
    }
    if (pathArray.length > 0) {
      let newMessage = `pages[${pathArray.toString()}] debe ser una url válida`;
      newError["pages"] = newMessage;
    }
  } else {
    newError = { message: "No tienes permiso para realizar esta acción" };
  }
  return newError;
};

export const parseToJson = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}


