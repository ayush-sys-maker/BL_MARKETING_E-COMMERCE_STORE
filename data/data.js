import dotenv from "dotenv";
import {Pool} from "pg";
dotenv.config();    



const data =   new Pool({
    
user:"postgres",
password:"987654",
host:"localhost",
port:5432,
database:"BL MARKETING"


})

export default data;