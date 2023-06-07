const app = require('./app');
const connectionDatabase = require('./db/database');

// handling uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
});

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path : "backend/config/.env"
    });
}

// database
connectionDatabase();

// server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`);
});

// handling unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
});
