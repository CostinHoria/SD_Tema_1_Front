import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';


import * as API_USERS from "./api/medication-api"
import MedicationTable from "./components/medication-table";
import MedicationForm from "./components/medication-form";
import MedicationFormDelete from "./components/medication-form-delete";
import validate from "./components/validators/medication-validators";


class MedicationContainer extends React.Component{
    constructor(props) {
        super(props);
        this.reloadHandler = this.props.reloadHandler;
        this.state = {
            selected: false,
            collapseForm: false,
            medicationId : props.match.params.id,
            medication:null,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            value:'',

            formControls: {
                name: {
                    value: '',
                    placeholder: 'Enter name!',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: false
                    }
                },

                description: {
                    value: '',
                    placeholder: 'Enter the description of the drug!',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: false
                    }
                },

                price: {
                    value: '',
                    placeholder: 'Enter the price!',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: false
                    }
                }
            }
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);

        this.deleteMedication = this.deleteMedication.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event=> {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    }


    componentDidMount() {
        this.fetchMedications();
        this.fetchMedication();
    }

    fetchMedication() {
        let idParam = {"id": this.state.medicationId};
        return API_USERS.getMedicationById(idParam,(result,status,err)=>{
            if (result !== null && status === 200) {
                console.log("O gasit medicamentul!");
                this.state.medication = result;
                this.state.isLoaded = true;
                this.state.formControls.name.value = result.name;
                this.state.formControls.description.value = result.description;
                this.state.formControls.price.value = result.price;
                this.afterFetchMedication();
                this.setState(this.state);
            }else{
                console.log("NU o gasit medicamentul!");
                this.state.errorStatus = status;
                this.state.error = err;
                this.setState(this.state);
            }
        })
    }

    afterFetchMedication()
    {
        let formIsValid = true;
        for(let formName in this.state.formControls){
            this.state.formControls[formName].valid = validate(this.state.formControls[formName].value, this.state.formControls[formName].validationRules);
            this.setState(this.state);
            formIsValid = this.state.formControls[formName].valid && formIsValid;
        }
        let newState = this.state;
        newState.formIsValid = formIsValid;
        this.setState(newState);
    }

    fetchMedications() {
        return API_USERS.getMedications((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    deleteMedication(medicationName) {
        return API_USERS.deleteMedicationByName(medicationName, (result,status,err) => {
            if(result !== null && (status === 200)){
                console.log("O STERS CU NUMELE: "+result);
                this.state.message = "O STERS CU NUMELE" + result;
                this.setState(this.state);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        })
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleFormDelete() {
        this.setState({selected: !this.state.selected});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.toggleFormDelete();
        this.fetchMedications();
    }

    handleDelete(){
        let medicationName = this.state.formControls.name.value;
        console.log("Medication name:"+medicationName);
        this.deleteMedication(medicationName);
    }
    handleDeleteById(){
        let medicationID = this.state.medicationId;
        this.deleteMedicationById(medicationID);
    }

    render()
    {
        return (
            <div>
                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                <CardHeader>
                <strong> Medication Management </strong>
            </CardHeader>
            <Card>
                <br/>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button color="primary" onClick={this.toggleForm}>Add Medication </Button>

                        <Button type={"delete"} onClick={this.handleDelete}> Delete Medication</Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}/>}
                        {this.state.errorStatus > 0 && <APIResponseErrorMessage
                            errorStatus={this.state.errorStatus}
                            error={this.state.error}
                        />   }
                    </Col>
                </Row>
            </Card>



                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>


        </div>
    )
    }
}

export default MedicationContainer;