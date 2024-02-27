const express = require('express');
const router = require('./src/students/routes');
const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello from server");
})

app.use('/api/v1/students', router);

app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
});

