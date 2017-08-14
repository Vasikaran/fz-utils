import { isObject, nonMutateData } from './common/utils';
import errorHandling from './common/errorHandling';

const deepValues = {};

let searchInObj = (object, key)=>{
    if(errorHandling(object, key)){
        let keys = Object.keys(object);
        let keyPath = arguments[2] ? arguments[2] : '';
        if (keys.indexOf(key) !== -1){
            if (keyPath !== ''){
                keyPath += '.';
            }
            deepValues[keyPath + key] = object[key];
        }

        keys.forEach(objectKey=>{
            if(object[objectKey]){
                let path = keyPath;
                if(isObject(object[objectKey])){
                    if (path !== '' && !path.endsWith('.')){
                        path += '.';
                    }
                    path += objectKey;
                    search(object[objectKey], key, path)
                }
            }
        })
        return deepValues;
    }
}

let search = (object, key)=>{
    let newObject = nonMutateData(object);
    return searchInObj(newObject, key);
}

export default search;
