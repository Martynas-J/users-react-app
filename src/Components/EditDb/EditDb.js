import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../Config/Config";


export const EditDb = () => {
    useEffect(() => {
        axios.post(`${API_URL}/users`, {
            name: "John Doe",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496"
              }
            } }).then (res => console.log(res.data))
    }, [])
}