import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    user: '/user'
};

function getUserByUsernameAndPassword(username, password, callback){
    let request = new Request(HOST.backend_api + endpoint.user+ "/" + username + "/" + password, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function postUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user , {
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

export {
    getUserByUsernameAndPassword,
    postUser,
};