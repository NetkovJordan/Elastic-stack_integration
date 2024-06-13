const express = require('express');
const winston = require('winston');

const app = express();
let callCount = 0;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'output.log' })
  ]
});

function logInitializationData() {
  logger.info('Application initialized with the following data:');
  logger.info('Server started on port 3000');
  logger.info('Database connected successfully');
}

function logCall(callInfo) {
  logger.info(`Received call: ${callInfo}`);
}

logInitializationData();

// Generate 10 errors
for (let i = 0; i < 10; i++) {
  logger.error(`This is error number ${i + 1}`);
}

// Generate 10 warnings
for (let i = 0; i < 10; i++) {
  logger.warn(`This is warning number ${i + 1}`);
}

app.get('/', (req, res) => {
  callCount++;
  const callInfo = `Call at ${new Date().toISOString()}`;
  logCall(callInfo);
  res.send(`This is call number ${callCount}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Check output.log for logs.`);
});
