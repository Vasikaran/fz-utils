import findNestedValue from './common/findNestedValue';
import { nonMutateData } from './common/utils';

function getn(object, keyPath){
    let option = {
        type: 'GET_VALUE'
    }
    let newObject = nonMutateData(object);
    return findNestedValue(newObject, keyPath, option);
}

export default getn;
