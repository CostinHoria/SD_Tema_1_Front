import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medication: '/medication',
    delete: '/delete',
    update: '/update'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + "/" + params, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function postMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

/*function deleteMedicationByName(medicationName, callback){
    console.log("Medication name:"+medicationName);
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.delete + "/" + medicationName, {
        method: 'DELETE',

    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}*/

function deleteMedicationById(medicationID, callback){
    console.log("Medication ID:"+medicationID);
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.delete + "/" + medicationID, {
        method: 'DELETE',

    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedicationByName(medicationName, callback){
    console.log("DELETE BY THIS NAME:"+medicationName);
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.delete + "/" + medicationName, {
        method: 'DELETE',

    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updateMedication(user, callback){
    console.log("Medication UPDATE!");
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.update , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
  getMedications,
  getMedicationById,
  deleteMedicationByName,
  postMedication,
    deleteMedicationById,
    updateMedication
};