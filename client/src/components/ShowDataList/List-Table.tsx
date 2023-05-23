import React from "react";
import { Col, Table } from "react-bootstrap";
import IDataList from "../../models/IDataList";
import ListTotal from "./List-Total";

type Props = {
    data: IDataList[],
    totalSpend: number,
    rahulsSpend: number,
    rameshsSpend: number
}


const ShowListTable = ({ data, totalSpend, rahulsSpend, rameshsSpend }: Props) => {
    return (
        <>
            <Col md={7}>
                <Table striped bordered hover className="boxShadow">
                    <thead className="position-sticky bg-white table-dark" style={{ top: 0 }}>
                        <tr style={{ borderTop: "1px solid black" }}>
                            <th>#</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Payee Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.setDate}</td>
                                    <td>{data.product}</td>
                                    <td>{data.price}</td>
                                    <td>{data.payeeName}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
            <Col>
                <ListTotal totalSpend={totalSpend} rahulSpend={rahulsSpend} rameshSpend={rameshsSpend}></ListTotal>
            </Col>
        </>
    );

}


export default ShowListTable;