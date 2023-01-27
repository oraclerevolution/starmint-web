import apiKit from "./apikit";
import { useRouter } from 'next/router';


export const getUsers = async () => {
  const response = await apiKit.get("/users");
  setUser(response.data);
};

export const register = ({email, name, password, wallet}) =>{
  return apiKit.post('/register', {
    name,
    email, 
    password,
    wallet,
    'password_confirmation': password
  });
}

export const login = ({email, password}) =>{
  return apiKit.post('/login', {
    email, 
    password
  });
}

export const getLoggedInUser = async () => {
  try {
    const res = await apiKit.get("/user");
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const loggout = async ()  => {
  try {
    await apiKit.delete("/logout");
  } catch (error) {
    // nothing to do
  } finally {
    sessionStorage.clear();
  }
}


export const addNft = ({file, media_title, description, nft_quantity, blockchain_type}) =>{
  return apiKit.get('/nft', {
    file,
    media_title, 
    description,
    nft_quantity,
    blockchain_type
  });
}

