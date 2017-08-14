import copyContent from './common/copyContent';

function copy(srcPath, targetPath){
    let isCopy = true;
    copyContent(srcPath, targetPath, isCopy);
}

export default copy;
