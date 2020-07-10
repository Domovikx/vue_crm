import express from 'express';
import path from 'path';

const server = express();

// Подключаем билды фронтенда указывая статик директорию
server.use(express.static(path.join(__dirname, '../frontend/dist')));

export default server;
