import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [wsMessages, setWsMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // Fetch notes from API on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notes/")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Setup WebSocket connection on mount
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ message: "Hello from React!" }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWsMessages((prev) => [...prev, data.message]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(socket);

    // Cleanup on unmount
    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Django Notes (via REST API)</h1>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>: {note.content}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>WebSocket Messages</h2>
      {wsMessages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {wsMessages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
