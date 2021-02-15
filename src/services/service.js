import Cookies from 'js-cookie';

class Service {
    static async send(url, method="GET", token=null, data={}, params={}) {
        return await _request(url, method, token, data, params);
    }
}

async function _request(url, method, token=null, data={}, params={}) { 
    const xhr = new XMLHttpRequest();

    url = _getFullURL(url);
    if (params.url) {
        url += params.url + '/' 
    }

    console.log(data);

    xhr.open(method, url);

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');


    if (token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }

    if (Cookies.get('csrftoken')) {
        xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));
    }     

    xhr.withCredentials = true;

    const dataJson = JSON.stringify(data);
    xhr.send(dataJson);

    return new Promise( (resolve, reject) => {
        xhr.onload = () => { 
                console.log(xhr);
                if ((xhr.status) >= 200 && (xhr.status < 300)) {
                    const result = xhr.responseText ? xhr.responseText : '{}';
                    resolve(JSON.parse(result));
                } else {
                    reject();
                }
             }
        
    })
}


function _getFullURL(url) {
    console.log(window.location.origin, url)
    return  window.location.origin + '/' + url
}

export default Service;
