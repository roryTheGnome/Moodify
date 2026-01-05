const express=require("express");
const sqlite3=require("sqlite3").verbose();
//shout out to the reddit comunity to introducing me to the verbose, thnx guys

const cors=require("cors");
//cause backend n front runs on different places for some reason

const bcrypt = require("bcrypt");
//for phase 2 (check usefull links when needed)

const app=express();
const port=3001;
app.use(cors());
app.use(express.json());
const db=new sqlite3.Database("./database.db");


//MY CHEATSHEAT : https://www.codecademy.com/learn/learn-node-sqlite/modules/learn-node-sqlite-module/cheatsheet

//SONG------------------------------------------------------------------------------------------------------------------
app.get("/songs",(req,res) =>{
    db.all("SELECT * FROM Song", [],(err, rows)=>{
        res.json(rows);
    });
});

app.get("/songs/:id", (req,res)=>{
    const SID=req.params.id;
    db.get(
        'SELECT * FROM Song WHERE ID=?',[SID],(err, song)=>{
            db.all(
                'SELECT Mood.ID , Mood.Name , Mood.Created_By FROM Mood JOIN Mood_Song ON Mood.ID = Mood_Song.mood_ID WHERE Mood_Song.Song_ID=?',
                [SID],(ERR,moods)=> {
                    res.json({song, moods});
                }
            );
        }
    );
});

app.post("/songs/add", (req,res)=>{
    const {Name, Artist, Duration_in_Secs, Release_Date}=req.body;

    if(!Name || !Artist || !Duration_in_Secs || !Release_Date){
        return res.status(400).json({error:"All fields  are required"});
    }

    if(!Number.isInteger(Duration_in_Secs) || Duration_in_Secs<=0){
        return res.status(400).json({
            error:"Song duration must be more than 0"
        });
    }

    const checkDuplicate='SELECT ID FROM Song WHERE Name=? AND Artist=?';

    db.get(checkDuplicate,[Name, Artist],(err,row)=>{
       if(err){
           return res.status(500).json(err);
       }

       if(row){
           return res.status(409).json({
               error:"Song duplication"
           });
       }

        const insert ='INSERT INTO Song (Name, Artist, Duration_in_Secs, Release_Date) VALUES (?, ?, ?, ?)';

        db.run(insert, [Name, Artist, Duration_in_Secs, Release_Date], function(err){
            if (err){
                return res.status(500).json(err);
            }
            res.json({message: "Song is added to the system", id:this.lastID});
        });

    });

    //db operations work asynchronous!!!! do not stack in validation
/*
    const insert ='INSERT INTO Song (Name, Artist, Duration_in_Secs, Release_Date) VALUES (?, ?, ?, ?)';

    db.run(insert, [Name, Artist, Duration_in_Secs, Release_Date], function(err){
        if (err){
            return res.status(500).json(err);
        }
        res.json({message: "Song is added to the system", id:this.lastID});
    });*/
} );

app.put("/songs/:id/edit",(req,res)=>{
    const {Name, Artist, Duration_in_Secs, Release_Date}=req.body;
    const id=req.params.id;

    if (!Name || !Artist || !Duration_in_Secs || !Release_Date) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    if(!Number.isInteger(Duration_in_Secs) || Duration_in_Secs<=0){
        return res.status(400).json({
            error:"Song duration must be more than 0"
        });
    }


    const checkDuplicate =
        `SELECT ID FROM Song WHERE Name = ? AND Artist = ? AND ID != ?`;

    db.get(checkDuplicate, [Name, Artist, id], (err, row) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (row) {
            return res.status(409).json({
                error: "Song duplication"
            });
        }

        // 4️⃣ Update
        const updateQuery = `
            UPDATE Song 
            SET Name = ?, Artist = ?, Duration_in_Secs = ?, Release_Date = ?
            WHERE ID = ?
        `;

        db.run(
            updateQuery,
            [Name, Artist, Duration_in_Secs, Release_Date, id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    message: "Song updated successfully",
                    updated: this.changes
                });
            }
        );
    });
});

app.delete("/songs/:id/delete",(req,res)=>{
    const id=req.params.id;

    db.run("DELETE FROM Mood_Song WHERE Song_ID=?", [id], function(err){
        if (err) return res.status(500).json({error: err.message});
        db.run("DELETE FROM Song WHERE ID=?", [id], function (err) {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({deleted: this.changes});
        });
    });
});

//Mood------------------------------------------------------------------------------------------------------------------
app.get("/moods", (req,res)=>{
    db.all("SELECT Mood.ID, Mood.Name, Mood.Description, Account.Name AS Created_By FROM Mood JOIN Account ON Mood.Created_By = Account.ID",
        [],(err, rows)=> res.json(rows));
});

app.get("/moods/:id", (req,res) =>{
    const MID=req.params.id;
    db.get(
        'SELECT Mood.ID, Mood.Name, Mood.Description, Account.Name AS Created_By FROM Mood JOIN Account ON Mood.Created_By = Account.ID WHERE Mood.ID=? ',
        [MID],(err,mood)=>{
            db.all(
                'SELECT * FROM Song JOIN Mood_Song ON Song.ID = Mood_Song.Song_ID WHERE Mood_Song.Mood_ID=?',
                [MID],(err,songs)=> {
                    res.json({mood, songs});
                }
            );
        }
    );
});

app.post("/moods/add",(req,res)=>{
    const {Name,Description,Created_By}=req.body;

    if(!Name || !Description){
        return res.status(400).json({ error: "All fields are required" });
    }

    const checkDuplicate = `SELECT ID FROM Mood WHERE Name = ? `;

    db.get(checkDuplicate,[Name],(err,row)=>{
        if(err){return res.status(500).json(err);}

        if(row){
            return res.status(409).json({error: "Mood already exists"});
        }

        const insert=`INSERT INTO Mood (Name, Description, Created_By) VALUES (?,?,?)`;

        db.run(insert,[Name,Description,Created_By],function(err){
            if(err){return res.status(500).json(err);}

            res.json({
                message:"Added succesfully", id:this.lastID
            });
        });

    });

});

app.put("/moods/:id/edit", (req, res) => {
    const { Name, Description } = req.body;
    const id = req.params.id;

    if (!Name || !Description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        "UPDATE Mood SET Name=?, Description=? WHERE ID=?",
        [Name, Description, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ updated: this.changes });
        }
    );
});

app.delete("/moods/:id/delete", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM Mood_Song WHERE Mood_ID=?", [id], function(err){
        if (err) return res.status(500).json({error: err.message});
        db.run("DELETE FROM Mood WHERE ID=?", [id], function (err) {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.json({deleted: this.changes});
        });
    })
});


/*app.post("/moods/add", (req,res)=>{
    const {Name, Description, Created_By}=req.body;

    if(!Name || !Description || !Created_By){
        return res.status(400).json({error:"All fields  are required"});
    }

    const checkDuplicate='SELECT ID FROM Mood WHERE Name=?';

    db.get(checkDuplicate,[Name],(err,row)=>{
        if(err){
            return res.status(500).json(err);
        }

        if(row){
            return res.status(409).json({
                error:"Mood duplication"
            });
        }

        const insert ='INSERT INTO Mood (Name, Description, Created_By) VALUES (?, ?, 1)';

        db.run(insert, [Name, Description, Created_By], function(err){
            if (err){
                return res.status(500).json(err);
            }
            res.json({message: "Mood is added to the system", id:this.lastID});
        });

    });

} );*/

//Mood-Account----------------------------------------------------------------------------------------------------------
app.get("/moods/:id/availablesongs",(req,res)=>{
    const moodID=req.params.id;

    const q=`SELECT * FROM Song WHERE ID NOT IN (SELECT Song_ID FROM Mood_Song WHERE Mood_ID=?)`;

    db.all(q, [moodID],(err,rows)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
}); //jsut a helper

app.post("/moods/:id/songs",(req,res)=>{
    const moodID=req.params.id;
    const {Song_ID}=req.body;

    if(!Song_ID){
        return res.status(400).json({error:"One would need a song to add a song"});
    }

    const checkDuplicate=`SELECT * FROM Mood_Song WHERE Mood_ID=? AND Song_ID=?`;

    db.get(checkDuplicate,[moodID,Song_ID],(err, row)=>{
        if(err)return res.status(500).json({error:err.message});

        if(row){
            return res.status(409).json({error:"Mood already has this song"});
        }

        const insert=`INSERT INTO Mood_Song (Mood_ID, Song_ID, Added_At) VALUES (?,?,datetime('now'))`;

        db.run(insert,[moodID,Song_ID],function (err) {
            if(err) return res.status(500).json({error:err.message});

            res.json({message:"Song added to mood succesfully"});
        });

    });

});

app.delete("/moods/:moodID/songs/:songID/delete",(req,res)=>{
    const {moodID,songID}=req.params;

    const deletee=`DELETE FROM Mood_Song WHERE Mood_ID=? AND Song_ID=?`;

    db.run(deletee,[moodID,songID],function (err){
       if(err){return res.status(500).json({error:err.message});}

       if(this.changes===0){
           return res.status(404).json({error:"Song is already not in the mod"});
       }

       res.json({message:"Song removed from mood"});

    });

});

//Account---------------------------------------------------------------------------------------------------------------
app.get("/users", (req,res)=>{
    db.all('SELECT Name,god_privilege FROM Account',[],(err,rows)=>res.json(rows));
});

app.post("/account/register",async (req,res)=>{
    const {Name,Password}=req.body;

    if (!Name || !Password){
        return res.status(400).json({error:"All fields are required (dude there are only two cmon)"});
    }

    if(Password.length<4){
        return res.status(400).json({error:"Password must be at lease 4 char log"});
    }

    const checDup=`SELECT ID FROM Account WHERE Name=?`;

    db.get(checDup,[Name],async (err,row)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }

        if(row){
            return res.status(409).json({error:"This name already in use"});
        }

        try{
            const hash = await bcrypt.hash(Password, 10); //i coulndt think of a better way for enctyption, im not sure even if this is the right way

            const instert=`INSERT INTO Account (Name,Password,God_Privilege) VALUES (?,?,0)`;

            db.run(instert,[Name,hash],function(err){
                if(err){
                    return res.status(500).json({error:err.message});
                }

                res.status(200).json({
                    message:"User added succsesfully",
                    id: this.lastID
                });
            });
        }catch (e){
            res.status(500).json({error:"Hashing error"});
        }

    });

});

app.post("/account/login",(req,res)=>{
    const {Name,Password}=req.body;

    if (!Name || !Password) {
        return res.status(400).json({
            error: "Enter all the informations for loging in"
        });
    }

    const chek=`SELECT ID, Name, Password, God_Privilege FROM Account WHERE Name=?`;

    db.get(chek,[Name], async (err,user)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }

        if (!user) {
            return res.status(401).json({
                error: "Invalid name"
            });
        }

        const match=await bcrypt.compare(Password,user.Password);

        if(!match){
            return res.status(401).json({error:"Wrong password"});
        }

        res.json({
            message:"Logged in",
            user:{
                ID:user.ID ,
                Name: user.Name,
                God_Privilege: user.God_Privilege
            }
        });
    });
})


app.listen(port, () => {
    console.log(`Hey, u might wanna check http://localhost:${port}`);
});