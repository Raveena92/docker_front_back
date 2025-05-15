import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get('/api/messages');
    setMessages(res.data);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    await axios.post('/api/messages', { text });
    setText('');
    fetchMessages();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Messages</h1>
      <form onSubmit={submitMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
