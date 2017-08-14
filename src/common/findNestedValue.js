import { isObject, stringHasValue, hasValue, getValueFromObject } from '../utils/utils';
import errorHandling from './errorHandling';

function findNestedValue(object, keyPath, option){
    if (errorHandling(object, keyPath, true)){
        let keys = keyPath.split('.');
        let key = keys[0];
        let checkedPath = arguments[3] ? arguments[3] + '.' + key : key;
        keys.splice(0, 1);
        keys = keys.join('.');
        let value = getValueFromObject(object, key);

        if (!stringHasValue(keyPath, '.')){
            if (option.type === 'SET_VALUE'){
                object[keyPath] = option.value;
                return;
            }else if (option.type === 'GET_VALUE'){
                if (hasValue(object, keyPath)){
                    return getValueFromObject(object, keyPath);
                }else{
                    let error = 'there is no value from your keyPath ' + keyPath;
                    throw error;
                }
            }
        }

        if (value){
            if (isObject(value)){
                return findNestedValue(value, keys, option, checkedPath);
            }else{
                if (option.type === 'SET_VALUE'){
                    object[key] = option.value;
                    return;
                }else if (option.type === 'GET_VALUE'){
                    return value;
                }
            }
        }else{
            if (keys !== ''){
                let error = checkedPath + ' of undefined';
                throw error;
            }
        }
    }
}

export default findNestedValue;
