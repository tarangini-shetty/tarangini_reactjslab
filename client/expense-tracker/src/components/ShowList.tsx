import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../services/menu";
import { pushDataFromUser } from "../services/menu";

export default function ShowData(){
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error |null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);

    useEffect(()=>{
        const fetchMenu = async () => {
            try{
                const data = await getDataFromServer();
                console.log(data);
                setItems(data);
                setSum(data.reduce((result,v) => result + v.price , 0))
                calculateShares(data);

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

const calculateShares = (data: IDataList[]) => {
    var rahulSpent1 : number = 0
    var rameshSpent1 : number = 0
    data.map(
        sams => (
            sams.payeeName === "Rahul" ? (
                rahulSpent1 = rahulSpent1 + sams.price
            ):
            (
                rameshSpent1 = rameshSpent1 + sams.price
            )
        )
    )
    setRahulSpent(rahulSpent1)
    setRameshSpent(rameshSpent1)
}

    //return (<h1>Show data comp</h1>);
    return (
        <>
            <header id="page-Header">Expense Tracker</header>

            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && items.map((user,idx)=>{
                    return(<div key={idx}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                    </div>)
                })
            }
        <hr/>
        <div className="use-inline">Total:</div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rahul paid: </div>
            <span className="use-inline total Rahul">{rahulSpent}</span> <br />
            <div className="use-inline ">Ramesh paid: </div>
            <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
            <span className="use-inline payable">{rahulSpent>rameshSpent? "Pay Rahul" : "Pay Ramesh"}</span> <br />
            <span className="use-inline payable price">{Math.abs((rahulSpent-rameshSpent)/2)}</span> <br />

        </>
    )
}