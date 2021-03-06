import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    caregiver: '/caregiver',
    delete: '/delete',
    update: '/update'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver , {
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

function deleteCaregiver(name, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + endpoint.delete + '/' + name, {
        method: 'DELETE',
    });
    console.log("NAME: "+name);
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(user, callback){
    console.log("Caregiver UPDATE!");
    let request = new Request(HOST.backend_api + endpoint.caregiver + endpoint.update , {
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
    getCaregivers,
    getCaregiverById,
    postCaregiver,
    deleteCaregiver,
    updateCaregiver
};