import { User } from "../../Types/User";

import { API } from "../api";

import { toast } from "react-hot-toast";

export const login = async (userDetails: User) => {
    const { data, status } = await API.post('/users/login', userDetails);
    if (status == 200) {
        return data;
    } else {
        toast.error(data.message)
    }
}
export const signup = async (userDetails: User) => {
    const { data, status } = await API.post('/users/signup', userDetails);
    if (status == 201) {
        toast.success("Account created successfully!");
        return data;
    } else {
        toast.error(data.message)
    }
}