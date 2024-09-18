import axios from "axios"
import authServices from "../auth/auth.services"

const employeeServices = {
    getProducts: async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/products", {
                headers: {
                    Authorization: authServices.getToken()
                }
            })
            return { data: res.data, status: res.status }
        } catch (error) {
            return { status: error.status }
        }
    },

    getCategories: async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/categories", {
                headers: {
                    Authorization: authServices.getToken()
                }
            })
            return { data: res.data, status: res.status }
        } catch (error) {
            return { status: error.status, error: error.message }
        }
    },

    newProduct: async (data) => {
        try {
            const res = await axios.post("http://localhost:4000/api/product", {
                productData: {
                    name: data.name,
                    description: data.description,
                    category_id: data.category_id
                },
                stock: data.stock
            }, {
                headers: {
                    Authorization: authServices.getToken()
                }
            })
            return { data: res.data, status: res.status }
        } catch (error) {
            return { status: error.status, errors: error.response.data.errors }
        }
    },
    updateProduct: async (data, id) => {
        console.log(data)
        try {
            const res = await axios.patch("http://localhost:4000/api/product", {
                productData: {
                    id,
                    name: data.name,
                    description: data.description,
                    category_id: data.category_id
                },
                stock: data.stock
            }, {
                headers: {
                    Authorization: authServices.getToken()
                }
            })
            return { data: res.data, status: res.status }
        } catch (error) {
            console.log(error)
            return { status: error.status, errors: error.response.data.errors }
        }
    }
}

export default employeeServices