import express from "express"
import data from "../data/data.js"
import bcrypt from "bcrypt"


const router = express.Router();

router.post("/signup",  async(req,res)=>{

    try{
    const {username,password,name} = req.body;


        const checkuser = await data.query("select * from user_table where username=$1",[username]);

 if(checkuser.rows.length > 0){
        return res.status(409).send("Username already exists");
    }




    const hashedpassword = bcrypt.hashSync(password,10);
    const {rows} = await data.query("INSERT INTO user_table (username,password,name) VALUES ($1,$2,$3)  RETURNING * ",[username,hashedpassword,name]);
    const user = rows[0];
    


    if(checkuser.rows.length > 0){
        return res.status(409).send("Username already exists");
    }
    req.session.user = {
        id:user.id,
        username:user.username,
        name:user.name
    }

    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
        } else {
            console.log("Session saved successfully");
        }  })
    
    res.redirect("/home");
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { rows } = await data.query("SELECT * FROM user_table WHERE username = $1", [username]);
        
        if (rows.length === 0) {
            return res.status(401).send("Invalid username or password");
        }
        
        const user = rows[0];
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(401).send("Invalid username or password");
        }
        
        req.session.user = {
            id: user.id,
            username: user.username,
            name: user.name // Include name for display
        };

        console.log("Session User:", req.session.user);

        // Save session explicitly before redirect
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Login failed");
            }
            res.redirect("/home");
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});





export default router;





