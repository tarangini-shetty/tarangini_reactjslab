import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import { pushDataFromUser } from "../services/menu";

type Props = {
    onTrue: any
    onClose: any
}

type State = {
    product:string,
    price:number,
    payeeName:string,
    setDate:string
}

//export default function ExpenseTracker(){
export default class ExpenseTracker extends Component<Props,State>{
    //return (<h1>Expense tracker comp</h1>);
    constructor(props :Props){
        super(props);
        this.state = {
            payeeName:"",
            product:"",
            price:0,
            setDate:""
        }
    }

    submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        //call api to create new purchase
        event?.preventDefault()
            const finalDate = {
                ...this.state
            }
            const data = await pushDataFromUser(finalDate);
            this.props.onTrue() 
    }

    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product:event.target.value
        });
    }

    setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName:event.target.value
        });
    }

    setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price : parseInt(event.target.value)
        });
    }

    loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate : event.target.value
        });
    }


    render(){
        //return (<h1>ExpenseTracker</h1>);
        return (<>
            <section>
                <header>
                    <h1>Add New item</h1>
                    <p>read the below instructions before proceeding:<br />Make sure you fill all the fields where * is provided</p>
                </header>
            <form onSubmit={this.submitHandler}>
                <article>
                    <p>Name</p>
                    <select name="Name" required value={this.state.payeeName} onChange={this.setPayee}>
                        <option value="" defaultChecked>Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>
                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={this.state.product} onChange={this.setProduct}></input>
                </article>
                <article>
                    <p>Price</p>
                    <input type="number" required value={this.state.price} onChange={this.setPrice}></input>
                </article>
                <article>
                    <p>Date</p>
                    <input type="date" required value={this.state.setDate} onChange={this.loggedDate}></input>
                </article>
                <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                <button type="submit" className="form-button"> Submit</button>
                //select .. options to choose, 
            </form>
            </section>
        </>)
    }
        
}