import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((response) => response.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((response) => {
                if(response.status === 204){
                    alert("Note deleted successfully!");
                } else {
                    alert("An error occurred. Please try again!");
                }
                getNotes();
            })
            .catch((err) => alert(err));
    }

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", {content, title})
            .then((response) => {
                if(response.status === 201){
                    alert("Note created successfully!");
                } else {
                    alert("An error occurred. Please try again!");
                }
                getNotes();
            })
            .catch((err) => alert(err));
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br/>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <br/>
                <label htmlFor="content">Content</label>
                <br/>
                <textarea 
                    id="content" 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
                <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    </div>
}

export default Home;