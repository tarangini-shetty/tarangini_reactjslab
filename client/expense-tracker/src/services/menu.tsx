import axios from "axios";
import IDataList from "../model/IDataList";

export const getDataFromServer = () =>{
    //use axios t
    //return axios.get()
    return axios.get<IDataList[]>(`http://localhost:4001/items`)
    .then(res => res.data)
}

export const pushDataFromUser = (newPurchase : Omit<IDataList, "id">) => {
    return axios.post<IDataList>(
        `http://localhost:4001/items`,
        newPurchase,
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
    ).then( response => response.data )
}