const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.send("Hello, Express Server is Running");
});

app.listen(port, () => {
    console.log(`✅ Server is Running on http://localhost:${port}`);
});