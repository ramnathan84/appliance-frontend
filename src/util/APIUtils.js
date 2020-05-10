const API_BASE_URL="http://appmgmt.cfapps.io/api";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        
    })
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function insertNewAppliance(newAppliance) {
    return request({
        url: API_BASE_URL + "/insertNewAppliance",
        method: 'POST',
        body: JSON.stringify(newAppliance)
    });
}

export function searchAppliance(searchAppliance) {
    console.log("Search appliance query:: ", searchAppliance);
    return request({
        url: API_BASE_URL + "/searchAppliance",
        method: 'POST',
        body: searchAppliance
    });
}

export function updateAppliance(appliance) {
    console.log("Update appliance query:: ", appliance);
    return request({
        url: API_BASE_URL + "/updateAppliance/" + appliance.id,
        method: 'PUT',
        body: JSON.stringify(appliance)
    });
}


export function getAllAppliance() {
    return request({
        url: API_BASE_URL + "/getAllAppliance",
        method: 'GET'
    });
}

export function getApplianceById(applianceId) {
    return request({
        url: API_BASE_URL + "/getApplianceById/" + applianceId,
        method: 'GET'
    });
}

export function deleteAppliance(applianceId) {
    return request({
        url: API_BASE_URL + "/deleteAppliance/" + applianceId,
        method: 'DELETE'
    });
}

export function login(loginRequest) {
    console.log("Login : " ,loginRequest)
    return request({
        url: API_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


  