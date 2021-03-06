import https from 'https';
import http from 'http';
import url from 'url';
import { isObject, isArray } from './common/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let callback = (resolve)=>{
    return (res)=>{
        res.setEncoding('utf8');
        let str = '';

        res.on('data', (chunk)=>{
            str += chunk;
        })

        res.on('end', ()=>{
            resolve({
                body: str,
                response: res
            });
        })

        res.on('error', (err)=>{
            process.stdout.write(err);
        })

    }
}


let request = (options)=>{
    return new Promise((resolve, reject)=>{
        let { protocol, hostname, path, port } = url.parse(options.url);
        let { method = 'GET', headers = {}, payload = {} } = options;
        let newOptions = {
            host: hostname,
            port: port,
            path: path,
            method: method,
            headers: headers
        };
        let req;

        if(protocol === 'https:'){
            req = https.request(newOptions, callback(resolve));
        }else if (protocol === 'http:'){
            req = http.request(newOptions, callback(resolve));
        }

        if (method.toUpperCase() === 'POST'){
            if(isObject(payload) || isArray(payload)){
                payload = JSON.stringify(payload);
            }
            req.write(payload);
        }
        req.end();
    })
}

export default request;
