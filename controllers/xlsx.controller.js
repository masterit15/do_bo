
import fs from 'fs';
import path from 'path'
const __dirname = path.resolve('./')
import db from '../db/index.js';
import XLSX from 'xlsx';
import * as windows1251 from 'windows-1251'



class xlsxControlles {
  constructor() {
    this.workbook = XLSX.readFile(__dirname+'/files/all.xlsx');
    this.sheet_name_list = this.workbook.SheetNames;
    this.headers = {};
    this.data = [];
    this.code = [];
    this.ZR_fileText;
    
  }

  readXLSXFile(){
    this.sheet_name_list.forEach(function(y) {
        var worksheet = this.workbook.Sheets[y];
        for(let z in worksheet) {
            if(z[0] === '!') continue;
            var tt = 0;
            for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;
            if(row == 1 && value) {
                this.headers[col] = value;
                continue;
            }
            if(!this.data[row]) this.data[row]={};
            this.data[row][this.headers[col]] = value;
        }
        this.data.shift();
        this.data.shift();

    });
  }
  test(){
    console.log('tetetetetetetetetet');
  }
  readZR(req,res){
    this.test()
      this.readFileZR(req.files[0].filepath)
      .then(t=>{
        res.json({ zrfile: t });
      })
      .catch(e=>{
        res.status(400).json({error})
      })
  }

  readFileZR(filePath){
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, null, function read(err, data) {
        if (err) {
          reject(err)
          throw err;
        }
        this.ZR_fileText = windows1251.dethis.code(data).toString();
        resolve(this.ZR_fileText)
      });
    })
  }
  searchcode(nameKey, myArray){
    return myArray.filter(arr=>arr.this.code_1 === nameKey||arr?.this.code_2 === nameKey||arr?.this.code_3 === nameKey)
  }
  
  findTextName(arr, text){
    return new Promise((resolve, reject) => {
      arr.forEach(c=>{
        if(text.indexOf(c.name) > 0 && text.indexOf(c.this.code_1) > 0 || text.indexOf(c?.this.code_2) > 0 || text.indexOf(c?.this.code_3) > 0){
          var newstr = text.replace(`|ДО|1`, `|ДО|${c.do}`);
          // console.log(text);
          resolve(newstr)
        }
      })
    })
  }
  findTextToZR(code, text){
    let ZR3 = []
    return new Promise((resolve, reject) => {
      code.forEach(c=>{
        text.split('ZROSN||УИН|0||-|').filter(t=> {
          if(t.indexOf(c) > 0){
            ZR3.push({t,c})
          }
        })
      })
      if(ZR3.length > 0){
        resolve(ZR3)
      }
    })
  }
  upgradeDB(){
    db.departament.insert(this.data, function (err) {
      if(err) throw err
    });
  }
  getText(){
    db.departament.find({}, function (err, departament) {
      departament.forEach(d=>{
        if('this.code_1' in d ) this.code.push(d.this.code_1)
        if('this.code_2' in d ) this.code.push(d.this.code_2)
        if('this.code_3' in d ) this.code.push(d.this.code_3)
        this.code = [...new Set(this.code)]
      })
      readZR().then(text=>{
        findTextToZR(this.code, text).then(res=>{
          res.filter(r=>{
            searchthis.code(r.c, departament)
            // searchName(name, myArray)
            findTextName(departament, r.t).then(r=>{
              // console.log(r);
            })
          })
        })
      })
    
    });
  }
}

export default new xlsxControlles()






