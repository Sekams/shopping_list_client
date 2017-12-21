//Analyze promise response and throw errors if any
global.checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        return response.json().then((responseJSON) => {
            throw responseJSON;
        })
    }
}

//Make http requests to the API
global.callAPI = (url, method, formData = null) => {
    return fetch(global.localStorage.getItem("baseUrl") + url, {
        method: method,
        body: formData,
        headers: {
            "Authorization": "Bearer " + global.localStorage.getItem("accessToken")
        }
    }).then(global.checkStatus)
};

//Clear messages in component state
global.clearMessages = (component) => {
    if (component._mounted) {
        component.setState({
            msg: '',
            msg_type: ''
        });
    }
}

//Remove spinner from view
global.dismissSpinner = (component) => {
    if (component && component._spinner) {
        component._spinner.showSpinner(false);
    }
}

//Put spinner into view
global.showSpinner = (component) => {
    if (component && component._spinner) {
        component._spinner.showSpinner(true);
    }
}