const sqlite3 = require('sqlite3').verbose();
import { RunResult } from "sqlite3";

const dbPath = '../database/spacecode.db';

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