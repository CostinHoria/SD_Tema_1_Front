import React from "react";
import * as API_USERS from "../api/medication-api";
import validate_medication from "./validators/medication-validators";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";


class MedicationFormUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm1 = this.toggleForm1.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {
            medicationDetails : this.props.medicationDetails,
            medicationID : this.props.medicationID,
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: this.props.medicationDetails.name,
                    placeholder: 'Name of the drug...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                description: {
                    value: this.props.medicationDetails.description,
                    placeholder: 'Description...',
                    valid: false,
                    touched: false,
                },
                price: {
                    value: this.props.medicationDetails.price,
                    placeholder: 'Price...',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm1() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate_medication(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    recoverMedicationById(id){
        return API_USERS.getMedicationById(id,(result,status,error)=>{
            if (result !== null && (status === 200 || status === 201)) {
                console.log("GOT MEDICATION : " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updateMedication(medication) {
        return API_USERS.updateMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully UPDATED MEDICATION with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let medication = {
            id: this.state.medicationID,
            name: this.state.formControls.name.value,
            description: this.state.formControls.description.value,
            price: this.state.formControls.price.value,
        };
        let new_id = this.state.medicationID;
        //let med = this.recoverMedicationById(new_id);
        console.log("MEDICATION NOU AICI: ",medication);
        this.updateMedication(medication);
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.props.medicationDetails.name}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description of the drug: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.props.medicationDetails.description}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='price'>
                    <Label for='priceField'> Price: </Label>
                    <Input name='price' id='priceField' placeholder={this.state.formControls.price.placeholder}
                           min={0.0} max={200.0} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.props.medicationDetails.price}
                           touched={this.state.formControls.price.touched? 1 : 0}
                           valid={this.state.formControls.price.valid}
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit UPDATE</Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default MedicationFormUpdate;