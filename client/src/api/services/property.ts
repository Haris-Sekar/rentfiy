import { IAddProperty } from "../../Types/Property"
import { API } from "../api"
import { toast } from "react-hot-toast"

export const addProperty = async (property: IAddProperty) => {
    const { data, status } = await API.post('/property', property);

    if (status === 201) {
        return data;
    } else {
        toast.error(data.message);
    }
}

export const sendMail = async (id: string) => {
    const { data, status } = await API.post('property/sendOwnerDetails', { propertyId: id });
    if (status === 200) {
        toast.success("Owner details sent to mail");
    } else {
        toast.error(data.message);
    }
}