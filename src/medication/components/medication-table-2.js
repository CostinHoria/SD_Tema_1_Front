import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "react-bootstrap";


class MedicationTable2 extends React.Component{
    columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
        {
            Header: 'Medication Page',
            Cell : props => {
                return {
                    <Button color="primary" onClick={ }></Button>
                }
            }
        }
    ];

    const filters = [
        {
            accessor: 'name',
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            tableData:this.props.tableData
        }
    }

    render() {

    }
}

export default MedicationTable2;