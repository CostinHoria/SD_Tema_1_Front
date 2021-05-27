import React from "react";
import Button from "react-bootstrap/Button";

import * as API from "./api/medication-api";
import validate_medication from "./components/validators/medication-validators";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

class MedicationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect : false,
            redirectTo : "/",
            medication : null,
            isLoaded : false,
            errorStatus : 0,
            error : "",
            formIsValid: false,

            formControls: {
                name: {
                    value: '',
                    placeholder: 'Name of the drug...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                description: {
                    value: '',
                    placeholder: 'Description...',
                    valid: false,
                    touched: false,
                },
                price: {
                    value: '',
                    placeholder: 'Price...',
                    valid: false,
                    touched: false,
                },
            }

        }





    }

    fetchMedication(){
        let newParams = {"id" : this.state.medicationId};
        return API.getMedicationById(newParams,(result,status, err)=>{
            if (result !== null && status === 200) {
                this.state.medication = result;
                this.state.isLoaded = true;
                this.state.formControls.name.value = result.name;
                this.state.formControls.description.value = result.description;
                this.state.formControls.price.value = result.price;
                this.setState(this.state);
            } else{
                this.state.errorStatus = status;
                this.state.error = err;
                this.setState(this.state);
            }
        });
    }

    componentDidMount() {
        this.fetchMedication();
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

    deleteMedication(medicationId){
        return API.deleteMedicationById(medicationId, (result, status, error) =>{
            if (result !== null && (status === 200 || status === 201)) {
                console.log("medication is DELETED with ID:"+medicationId);
                this.setState(this.state);
            }else{
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        })
    }

    updateMedication(medication){
        return API.updateMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                this.setState(this.state);
            }else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        })
    }

    handleDelete() {
        let medicationId = this.state.medicationId;
        this.deleteMedication(medicationId);
    }


    render() {
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

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description of the drug: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='price'>
                    <Label for='priceField'> Price: </Label>
                    <Input name='price' id='priceField' placeholder={this.state.formControls.price.placeholder}
                           min={0.0} max={200.0} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.price.value}
                           touched={this.state.formControls.price.touched? 1 : 0}
                           valid={this.state.formControls.price.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"delete"} disabled={!this.state.formIsValid} onClick={this.handleDelete}>  DELETE </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MedicationPage;
