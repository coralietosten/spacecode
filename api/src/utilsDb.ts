const sqlite3 = require('sqlite3').verbose();
import { RunResult } from "sqlite3";
import fs from 'fs';

const dbPath = '../database/spacecode2.db';
const sqlPath = '../database/spacecode.sql'


const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err:any) =>{
    if (err){
        console.log(err);
        console.error(err + "impossible de créer ou d'ouvrir la base de données");
        require('process').exit(-1);
    }
    db.run("PRAGMA foreign_keys = ON", function(err:any){
        if (err) {
            console.error("Erreur lors de l'activation des clés étrangères :", err);
        }
    });
});

export function initDb(){
    fs.readFile( sqlPath, (err:any, data:any) => {
        if (err){
            console.log(err + 'Erreur de création de la base de données');
            console.log(data)
            require('process').exit(-1);
        }
        // exécution ligne par ligne
        // const statements = data.split(';').map(s => s.trim()).filter(Boolean);
        // statements.forEach((stmt:any) => {
        // db.run(stmt, (err:any) => {
        //     if (err && err.message.includes('UNIQUE constraint failed')) {
        //     console.log("Données déjà existantes, skip :", stmt);
        //     } else if (err) {
        //     console.error("Erreur exécution SQL :", err);
        //     }
        // });
        // });
        db.exec(data.toString(), (err:any) => {
            if (err){
                console.error(err + "Impossible de remplir la base de données");
                require('process').exit(-1);
            }
        });
    });
};

export const all = (sql : any) => new Promise(function (resolve, reject) {
    db.all(sql, function (err: any, rows:any) { 
        if (err) {
            reject(err);
        }
        else {
            resolve(rows);
        }
    });
});

export const get = (sql : any) => new Promise(function (resolve, reject) {
    db.get(sql, function (err: any, rows:any) { 
        if (err) {
            reject(err);
        }
        else {
            resolve(rows);
        }
    });
});

export function run(sql : string, param : any[]){
    return new Promise((resolve, reject) =>{
        db.run(sql, param, function(this: RunResult, err: Error | null){ 
            if (err) {
                reject(err);
            }
            else {
                resolve(this);
            }
        });
    });
};

export default db;