import axios from "axios";
export const baseUrl =
  "http://127.0.0.1:5001/food-ordering-app-f2075/us-central1/app";

export const validateJwtToken = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response?.data;
  } catch {
    return null;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/products/create`, {
      ...data,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/products/all`);
    return response?.data?.data;
  } catch (err) {
    return err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/products/delete/${id}`);
    return response?.data?.data;
  } catch (err) {
    return err;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/allUsers`);
    return response?.data?.usersData;
  } catch (err) {
    return err;
  }
};

export const addNewItemToCart = async (userId, data) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/addToCart/${userId}`,
      {
        ...data,
      }
    );
    return res?.data?.data;
  } catch (err) {
    return err;
  }
};

export const getAllCartItems = async (userId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/getCartItems/${userId}`
    );
    return res?.data?.data;
  } catch (err) {
    return err;
  }
};

export const updateQuanitity = async (userId, productId, type) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateCart/${userId}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res?.data?.data;
  } catch (err) {
    return err;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/products/allOrders`);
    return response?.data?.data;
  } catch (err) {
    return err;
  }
};

export const updateOrderStatus = async (orderId, sts) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateOrder/${orderId}`,
      null,
      { params: { sts: sts } }
    );
    return res?.data?.data;
  } catch (err) {
    return err;
  }
};
