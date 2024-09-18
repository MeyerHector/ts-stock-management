import axios from "axios";

const authServices = {

    login: async ({ username, password }) => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", {
                credentials: {
                    username,
                    password
                }
            })
            return response
        } catch (error) {
            return error
        }
    },

    getToken: () => localStorage.getItem("token"),

    setToken: (token) => localStorage.setItem("token", token),

    logout: () => localStorage.removeItem("token"),

    verifyToken: async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/auth/verify-token`, {
                headers: {
                    Authorization: `Bearer ${authServices.getToken()}`,
                },
            });
            return { data: res.data, status: res.status };
        } catch (error) {
            console.log(error);
            return error
        }
    },
}
export default authServices