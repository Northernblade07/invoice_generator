import axiosInstance from "./axios";

export const signUp = async(signupData:{name:string , email:string , password:string}) => {
    const res = await axiosInstance.post("/auth/signup",signupData)
    return res.data;
}

export const login = async(loginData:{email:string , password :string})=>{
    const res = await axiosInstance.post("/auth/login",loginData);
    return res.data
}

export const logout =async()=>{
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}


export const addProduct = async (productData: { name: string; qty:number; rate: number }) => {
  const response = await axiosInstance.post("/products/add", productData);
  return response.data;
};

export const getProducts = async () => {
  const response = await axiosInstance.get("/products/all");
  return response.data.products;
};

