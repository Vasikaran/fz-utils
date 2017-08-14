import fs from 'fs';
import path from 'path';

let removeDirectory = (dirPath)=>{
    fs.readdirSync(dirPath).forEach((fileOrDir)=>{
        fileOrDir = path.join(dirPath, fileOrDir);
        if(fs.statSync(fileOrDir).isDirectory()){
            removeDirectory(fileOrDir);
        }else{
            fs.unlinkSync(fileOrDir);
        }
    })
}

let copyFile = (srcPath, targetPath, isCopy = true)=>{
    let readStream = fs.createReadStream(srcPath)
    let writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);
    if (!isCopy){
        try{
            fs.unlinkSync(fileOrDir);
        }catch(err){
            process.stdout.write(err);
        }
    }
}

let iterateDirectory = (srcPath, targetPath, isCopy, extension)=>{
    fs.readdirSync(srcPath).forEach((fileOrDir)=>{
        let fromPath = path.join(srcPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(toPath)){
                fs.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, isCopy, extension);
        }else{
            if (extension){
                let { ext } = path.parse(fromPath);
                if (ext === extension){
                    copyFile(fromPath, toPath, isCopy);
                }
            }else{
                copyFile(fromPath, toPath, isCopy);
            }
        }
    })
}

let copyContent = (srcPath, targetPath, isCopy, ext)=>{
    if(fs.statSync(srcPath).isDirectory()){
        let { name } = path.parse(srcPath);
        let originPath = path.join(targetPath, name);
        if (!fs.existsSync(originPath)){
            fs.mkdirSync(originPath);
        }
        iterateDirectory(srcPath, originPath, isCopy, ext);
    }else{
        copyFile(srcPath, targetPath, isCopy);
    }
    if (!isCopy){
        removeDirectory(srcPath);
    }
}

export default copyContent;
