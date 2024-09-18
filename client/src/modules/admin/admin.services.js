import axios from "axios";
import authServices from "../auth/auth.services";

const adminServices = {
    getUsers: async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/admin/users", {
                headers: {
                    Authorization: authServices.getToken()
                }
            })
            return { data: res.data, status: res.status }
        } catch (error) {
            return { status: error.status, message: error.message }
        }
    },
    registerUser: async (user) => {
        try {
            const res = await axios.post("http://localhost:4000/api/admin/user",
                {
                    user
                },
                {
                    headers: {
                        Authorization: authServices.getToken()
                    }
                }
            )
            return { data: res.data, status: res.status }
        } catch (error) {
            return { status: error.status, errors: error.response.data.errors }
        }
    }
}

export default adminServices;