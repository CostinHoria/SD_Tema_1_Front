import React from "react";
import Table from "../../commons/tables/table";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import CaregiverFormUpdate from "./caregiver-form-update";
import CaregiverFormDelete from "./caregiver-form-delete";




class CaregiverTable extends React.Component {

    columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Password',
            accessor: 'password',
        },
        {
            Cell: props=>{

                return(
                    <button style={{backgroundColor: "green", color:"#fefefe"}}
                            onClick={() => this.toggleUpdateForm(props.original.id, props.original.name, props.original.email, props.original.password)}>Update</button>
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
            caregiverDetails:"",
            caregiverID : "",
            selected2: false,
        };
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    }

    toggleUpdateForm(id,name,email,password){

        let caregiver = {
            name: name,
            email: email,
            password: password,
        };

        this.state.caregiverID = id;
        this.state.caregiverDetails = caregiver;
        console.log("ID: ",this.state.caregiverID);
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
                <div>
                    <Modal isOpen={this.state.selected2} toggle={this.toggleUpdateForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleUpdateForm} > UPDATE: </ModalHeader>
                        <ModalBody>
                            <CaregiverFormUpdate caregiverDetails = {this.state.caregiverDetails} caregiverID = {this.state.caregiverID} reloadHandler={this.reloadAfterUpdate} />
                        </ModalBody>
                    </Modal>
                </div>
            </div>

            </div>
        )
    }
}

export default CaregiverTable;