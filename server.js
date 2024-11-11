const express = require('express');
const path = require('path');
const fs = require('fs');
var ghpages = require('gh-pages');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file does not exist, send a 404 response
            res.status(404).send('Page not found');
        } else {
            // If the file exists, send it
            res.sendFile(filePath);
        }
    });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});