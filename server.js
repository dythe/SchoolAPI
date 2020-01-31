const port = 8081;

const app = require('./app');

app.listen(port, function () {
    console.log("NodeJS Server running on port %s", port)
});