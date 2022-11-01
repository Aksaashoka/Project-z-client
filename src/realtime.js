import { io } from 'socket.io-client';

export const Requetesocket = io('http://localhost:8080/');
