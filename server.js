
// // Dependencies
// // =============================================================
const express = require("express");
const path = require("path");
const fs = require ('fs');
var dbNotes = require("./db/db.json");




// // Sets up the Express App
// // =============================================================
var app = express();
var PORT = process.env.PORT || 3081;

// // Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) =>{
    console.log(req.url,req.method, res.statusCode)
    next()
});




// // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res)=> {
    res.json(dbNotes);
});


// // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, 
// // and then return the new note to the client.
// app.post("/api/notes", function (req, res) {
//     const newNote = req.body;
//     if (!newNote.id) {
//         newNote.id = uniqid();
//     };
//     dbNotes.push(newNote);
//     fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dbNotes));
//     res.json(newNote);
// });

app.post("/api/notes", (req,res)=>{
    const newNote= req.body
    //save the note into the db.json
    dbNotes.push(newNote)
    console.log(dbNotes, "whatsssssssssss upppppp")
    //write the db as a file for data persistence
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dbNotes), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      });
    res.json({ok:true})
})

// // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
// //  This means you'll need to find a way to give each note a unique `id` when it's saved. 
// // In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note 
// // with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id
    dbNotes.splice(noteId,1)
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dbNotes), function(err){
        if(err) {
            return console.log(err);
        }
        console.log("deleted");
    });
    res.json({ok:true})
});




// // Notes Title and Notes Data (DATA)
// // ============================================================= 



// // Routes
// // =============================================================
// //  GET /notes - Should return the notes.html file.
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/notes.html"));
        });

// // GET * - Should return the index.html file
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/index.html"));
        });

// // // Starts the server to begin listening
// // // =============================================================
 
// app.listen(PORT, ()=>console.log(`App is listening on port ${PORT}`))


// to pass the files 

  app.listen(PORT, ()=>console.log(`App is listening on port ${PORT}`))