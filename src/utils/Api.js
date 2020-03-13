import fetch from 'isomorphic-fetch';

const BASE_API_URL = 'http://localhost:3000/';

export function api(api_end_point, data) {
    let header = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    });
    return fetch(BASE_API_URL + api_end_point, {
        method: 'POST',
        mode: 'cors',
        headers: header,
        body: JSON.stringify(data),
    }).then(res => {
        console.log(res);
        return res.json();
    });
}
