const express=require("express");
const sqlite3=require("sqlite3").verbose();
//shout out to the reddit comunity to introducing me to the verbose, thnx guys

const cors=require("cors");
//cause backend n front runs on different places for some reason

const app=express();
const port=3001;
app.use(cors());
app.use(express.json());
const db=new sqlite3.Database("./database.db");


//MY CHEATSHEAT : https://www.codecademy.com/learn/learn-node-sqlite/modules/learn-node-sqlite-module/cheatsheet

//SONGS-----------------------------------------------------------------------------------------------------------------
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

    db.run("DELETE FROM Song WHERE ID=?",[id],function(err){
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({deleted:this.changes});
    });
});

//Moods-----------------------------------------------------------------------------------------------------------------
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
    const {Name,Description}=req.body;

    if(!Name || !Description){
        return res.status(400).json({ error: "All fields are required" });
    }

    const checkDuplicate = `SELECT ID FROM Mood WHERE Name = ? `;

    db.get(checkDuplicate,[Name],(err,row)=>{
        if(err){return res.status(500).json(err);}

        if(row){
            return res.status(409).json({error: "Mood already exists"});
        }

        const insert=`INSERT INTO Mood (Name, Description, Created_By) VALUES (?,?,2)`;

        db.run(insert,[Name,Description],function(err){
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

    db.run("DELETE FROM Mood WHERE ID=?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deleted: this.changes });
    });
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


//Accounts--------------------------------------------------------------------------------------------------------------
app.get("/users", (req,res)=>{
    db.all('SELECT Name FROM Account',[],(err,rows)=>res.json(rows));
});


app.listen(port, () => {
    console.log(`Hey, u might wanna check http://localhost:${port}`);
});