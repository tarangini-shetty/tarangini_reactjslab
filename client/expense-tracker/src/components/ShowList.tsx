import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../services/menu";
import { pushDataFromUser } from "../services/menu";

export default function ShowData(){
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error |null>(null);
    const [summ, setSum] = useState<number|null>(0);
    const [rahulSpent, setRahulSpent] = useState<number|null>(0);
    const [rameshSpent, setRameshSpent] = useState<number|null>(0);

    useEffect(()=>{
        const fetchMenu = async () => {
            try{
                const data = await getDataFromServer();
                console.log(data);
                setItems(data);
                // let newPurchase = {
                //     "payeeName": "Rahul",
                //     "product": "water",
                //     "price": 100,
                //     "setDate": "2022-10-30"
                // }
                // const purchasedData = await pushDataFromUser(newPurchase);
            }
            catch(error:any){
                console.error(error);
            }
        }
        fetchMenu()
    },[]);
    return (<h1>Show data comp</h1>);
}