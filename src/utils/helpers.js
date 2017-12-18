global.checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        return response.json().then((responseJSON) => {
            throw responseJSON;
        })
    }
}

global.callAPI = (url, method, formData = null) => {
    return fetch(global.localStorage.getItem("baseUrl") + url, {
        method: method,
        body: formData,
        headers: {
            "Authorization": "Bearer " + global.localStorage.getItem("accessToken")
        }
    }).then(global.checkStatus)
};

global.clearMessages = (component) => {
    if (component._mounted) {
        component.setState({
            msg: '',
            msg_type: ''
        });
    }
}