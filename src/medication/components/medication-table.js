import React from "react";
import Table from "../../commons/tables/table";
import Button from "react-bootstrap/Button";
import * as MEDICATION_API from "../api/medication-api";
import MedicationPage from "../medication-page";

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import * as API_USERS from "../api/medication-api";
import Home from "../../home/home";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import PersonFormDelete from "../../person/components/person-form-delete";
import MedicationFormUpdate from "./medication-form-update";

class MedicationTable extends React.Component {

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
            Cell: props=>{

                return(
                    <button style={{backgroundColor: "green", color:"#fefefe"}}
                            onClick={() => this.toggleUpdateForm(props.original.id, props.original.name, props.original.description, props.original.price)}>Update</button>
                            )
                            },
                                width: 150,
                                maxWidth: 150,
                                minWidth: 150,
                            },

];

    filters = [
    {
        accessor: 'name',
    }
];







    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            updateMedication:false,
            medicationDetails:"",
            medicationID : "",
            selected2: false,
        };
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this);

    }
    toggleUpdateForm(id,name,description,price){

        let med = {
            name: name,
            description: description,
            price: price,
        };

        this.state.medicationID = id;
        this.state.medicationDetails = med;
        console.log("ID: ",this.state.medicationID);
        this.setState({selected2: !this.state.selected2});
    }

    reloadAfterUpdate(){
        this.state.selected2 = false;
    }

    render() {
        return (
            <div>
            <Table
                data={this.state.tableData}
                columns={this.columns}
                search={this.filters}
                pageSize={5}
            />
            <div>
                <Modal isOpen={this.state.selected2} toggle={this.toggleUpdateForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleUpdateForm} > UPDATE: </ModalHeader>
                    <ModalBody>
                        <MedicationFormUpdate medicationDetails = {this.state.medicationDetails} medicationID = {this.state.medicationID} reloadHandler={this.reloadAfterUpdate} />
                    </ModalBody>
                </Modal>
            </div>

            </div>
        )
    }
}

export default MedicationTable;