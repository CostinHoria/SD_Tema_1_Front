import {CardHeader,Button, Col, Modal,Card, ModalBody, ModalHeader, Row} from "reactstrap";
import MedicationForm from "../medication/components/medication-form";
import React from "react";
import PatientForm from "../patient/components/patient-form";
import CaregiverForm from "../caregiver/components/caregiver-form";
import MedicationFormDelete from "../medication/components/medication-form-delete";
import CaregiverFormDelete from "../caregiver/components/caregiver-form-delete";
import PatientFormDelete from "../patient/components/patient-form-delete";

import PatientTable from "../patient/components/patient-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import MedicationTable from "../medication/components/medication-table";
import CaregiverTable from "../caregiver/components/caregiver-table";

import * as MEDICATION_API from "../medication/api/medication-api";
import * as Patient_API from "../patient/api/patient-api";
import * as CAREGIVER_API from "../caregiver/api/caregiver-api";

import { Client } from '@stomp/stompjs';

import {NotificationManager,NotificationContainer} from 'react-notifications';


class DoctorMainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            insertMedication: false,
            insertCaregiver: false,
            insertPatient: false,
            deleteMedication:false,
            deleteCaregiver:false,
            deletePatient:false,
            isLoadedMedication: false,
            isLoadedCaregiver: false,
            isLoadedPatient: false,
            tableDataPatient:[],
            tableDataMedication:[],
            tableDataCaregiver:[],

            errorStatus:0,
            error: null


        };

        this.toggleInsertMedicationForm = this.toggleInsertMedicationForm.bind(this);
        this.toggleInsertPatientForm = this.toggleInsertPatientForm.bind(this);
        this.toggleInsertCaregiverForm = this.toggleInsertCaregiverForm.bind(this);

        this.toggleDeleteMedicationForm = this.toggleDeleteMedicationForm.bind(this);
        this.toggleDeleteCaregiverForm = this.toggleDeleteCaregiverForm.bind(this);
        this.toggleDeletePatientForm = this.toggleDeletePatientForm.bind(this);


        this.reloadMedication = this.reloadMedication.bind(this);
        this.reloadPatient = this.reloadPatient.bind(this);
        this.reloadCaregiver = this.reloadCaregiver.bind(this);

        this.reloadMedicationAfterDelete = this.reloadMedicationAfterDelete.bind(this);
        this.reloadCaregiverAfterDelete = this.reloadCaregiverAfterDelete.bind(this);
        this.reloadPatientAfterDelete = this.reloadPatientAfterDelete.bind(this);


        this.fetchMedications = this.fetchMedications.bind(this);
        this.fetchPatients = this.fetchPatients.bind(this);
        this.fetchCaregivers = this.fetchCaregivers.bind(this);

    }

    sendPopup = (message) =>
    {
        return (
            NotificationManager.info(message, 'POP UP', 2000)
        );
    }

    componentDidMount() {

        this.fetchMedications();
        this.fetchPatients();
        this.fetchCaregivers();

        let client = new Client();

        client.configure({

            brokerURL: 'ws://localhost:8080/assig2-websocket',

            onConnect: () => {
                client.subscribe('/topic/warning', message => {

                    this.sendPopup(message.body);
                })
            }
        })

        client.activate();
    }

    toggleInsertMedicationForm(){
        this.state.insertMedication = !this.state.insertMedication;
        this.setState(this.state);
    }

    toggleInsertPatientForm(){
        this.state.insertPatient = !this.state.insertPatient;
        this.setState(this.state);
    }

    toggleInsertCaregiverForm(){
        this.state.insertCaregiver = !this.state.insertCaregiver;
        this.setState(this.state);
    }

    toggleDeleteMedicationForm(){
        this.state.deleteMedication = !this.state.deleteMedication;
        this.setState(this.state);
    }

    toggleDeleteCaregiverForm(){
        this.state.deleteCaregiver = !this.state.deleteCaregiver;
        this.setState(this.state);
    }

    toggleDeletePatientForm(){
        this.state.deletePatient = !this.state.deletePatient;
        this.setState(this.state);
    }

    reloadMedication() {
        this.state.isLoadedMedication = false;
        this.setState(this.state);
        this.toggleInsertMedicationForm();
        this.fetchMedications();
    }


    reloadPatient() {
        this.state.isLoadedPatient = false;
        this.setState(this.state);
        this.toggleInsertPatientForm();
        this.fetchPatients();
    }

    reloadCaregiver() {
        this.state.isLoadedCaregiver = false;
        this.setState(this.state);
        this.toggleInsertCaregiverForm();
        this.fetchCaregivers();
    }

    reloadMedicationAfterDelete() {
        this.state.isLoadedMedication = false;
        this.setState(this.state);
        this.toggleDeleteMedicationForm();
        this.fetchMedications();
    }

    reloadCaregiverAfterDelete() {
        this.state.isLoadedCaregiver = false;
        this.setState(this.state);
        this.toggleDeleteCaregiverForm();
        this.fetchCaregivers();
    }

    reloadPatientAfterDelete() {
        this.state.isLoadedPatient = false;
        this.setState(this.state);
        this.toggleDeletePatientForm();
        this.fetchPatients()
    }


    fetchMedications(){
        return MEDICATION_API.getMedications((result, status,err)=>{
           if(result!==null && status === 200){
               this.setState({
                   tableDataMedication: result,
                   isLoadedMedication: true
               });
           } else {
               this.setState(({
                   errorStatus: status,
                   error: err
               }));
           }
        });
    }

    fetchPatients() {
        return Patient_API.getPatients((result,status,err)=>{
            if(result!==null && status === 200){

                this.setState({
                    tableDataPatient: result,
                    isLoadedPatient: true
                });
                console.log("FETCHUIESTE PERSOANELE");
            } else {
                console.log("NU FETCHUIESTE PERSOANELE");
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchCaregivers() {
        return CAREGIVER_API.getCaregivers((result, status,err)=>{
            if(result!==null && status === 200){
                this.setState({
                    tableDataCaregiver: result,
                    isLoadedCaregiver: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    render() {
        return(
            <div>
                <NotificationContainer>

                </NotificationContainer>
                <CardHeader>
                    <strong>Management</strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleInsertPatientForm}>Add Patient </Button>

                            <Button color="primary" onClick={this.toggleInsertMedicationForm}> Add Medication</Button>

                            <Button color="primary" onClick={this.toggleInsertCaregiverForm}> Add Caregiver</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleDeleteMedicationForm}> Delete Medication</Button>

                            <Button color="primary" onClick={this.toggleDeleteCaregiverForm}> Delete Caregiver</Button>

                            <Button color="primary" onClick={this.toggleDeletePatientForm}> Delete Patient</Button>
                        </Col>
                    </Row>

                <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedPatient && <PatientTable tableData = {this.state.tableDataPatient}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedMedication && <MedicationTable tableData = {this.state.tableDataMedication}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedCaregiver && <CaregiverTable tableData = {this.state.tableDataCaregiver}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>
                <div>
                    <Modal isOpen={this.state.insertMedication} toggle={this.toggleInsertMedicationForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleInsertMedicationForm}> Add Medication: </ModalHeader>
                        <ModalBody>
                            <MedicationForm reloadHandler={this.reloadMedication}/>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.insertPatient} toggle={this.toggleInsertPatientForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleInsertPatientForm}> Add Patient: </ModalHeader>
                        <ModalBody>
                            <PatientForm reloadHandler={this.reloadPatient}/>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.insertCaregiver} toggle={this.toggleInsertCaregiverForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleInsertCaregiverForm}> Add Caregiver: </ModalHeader>
                        <ModalBody>
                            <CaregiverForm reloadHandler={this.reloadCaregiver}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.deleteMedication} toggle={this.toggleDeleteMedicationForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleDeleteMedicationForm}> Delete Medication: </ModalHeader>
                        <ModalBody>
                            <MedicationFormDelete reloadHandler={this.reloadMedicationAfterDelete}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.deleteCaregiver} toggle={this.toggleDeleteCaregiverForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleDeleteCaregiverForm}> Delete Caregiver: </ModalHeader>
                        <ModalBody>
                            <CaregiverFormDelete reloadHandler={this.reloadCaregiverAfterDelete}/>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.deletePatient} toggle={this.toggleDeletePatientForm}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleDeletePatientForm}> Delete Patient: </ModalHeader>
                        <ModalBody>
                            <PatientFormDelete reloadHandler={this.reloadPatientAfterDelete}/>
                        </ModalBody>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default DoctorMainPage;