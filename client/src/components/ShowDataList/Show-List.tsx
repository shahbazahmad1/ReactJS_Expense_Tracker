import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import IDataList from "../../models/IDataList";
import { GetExpenseData } from "../../services/dataOperation";
import AddExpenseForm from "../AddExpense/AddExpenseForm";
import Loader from "../Loader/Loader";
import ListTable from "./List-Table";
import '../../css/formStyle.css'


const ShowList = () => {

    const [DataList, setDataList] = useState<IDataList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>();
    const [totalSpend, setTotalSpend] = useState<number>();
    const [rahulSpend, setRahulSpend] = useState<number>(0);
    const [rameshSpend, setRameshSpend] = useState<number>(0);
    const [showform, setShowForm] = useState<boolean>(false);

    var set_RahulSpend: number = 0;
    var set_RameshSpend: number = 0;

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);
                setError(null);

                try {
                    const ExpenseData = await GetExpenseData();
                    setDataList(ExpenseData);
                    setTotalSpend(ExpenseData.reduce((result: any, v: { price: any }) => result = result + v.price, 0));
                    AmtSpent(ExpenseData);
                } catch (error) {
                    setError(error as Error);
                }
                finally {
                    setLoading(false);
                }
            }
            helper();
        }, [showform]
    );

    const AmtSpent = (data: IDataList[]) => {
        data.map(payeeData => (
            payeeData.payeeName === "Rahul" ? (set_RahulSpend = set_RahulSpend + payeeData.price) :
                (set_RameshSpend = set_RameshSpend + payeeData.price)
        ))
        setRahulSpend(set_RahulSpend);
        setRameshSpend(set_RameshSpend);

    }

    const success = () => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }


    return (
        <>
            {
                loading &&
                <Loader message='Please wait, Loading...'></Loader>
            }
            {
                !loading && error &&
                <div>{error.message}</div>
            }
            {
                !loading && !error &&
                <>
                    <Row>
                        <Col md={2}>
                            <div className="py-3 position-sticky" style={{ top: 0 }}>
                                <button className="btn btn-dark btnBoxShadow" id="Add-Button" onClick={() => setShowForm(true)}>Add New</button>
                            </div>
                        </Col>

                        <ListTable data={DataList} totalSpend={totalSpend as number} rahulsSpend={rahulSpend as number} rameshsSpend={rameshSpend as number}></ListTable>
                    </Row>
                    {
                        showform && (
                            <div className="form">
                                <AddExpenseForm onTrue={success} onClose={cancel}/>
                            </div>
                        )
                    }
                </>
            }

        </>
    )
}

export default ShowList;