const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MessageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model('Message', MessageSchema);

app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/api/messages', async (req, res) => {
  const newMsg = new Message({ text: req.body.text });
  await newMsg.save();
  res.json(newMsg);
});

app.listen(5000, () => {
  console.log('Backend listening on port 5000');
});

