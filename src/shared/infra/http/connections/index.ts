import { logger } from '@shared/utils';
import { Server } from 'socket.io';

interface User {
  username: string;
  avatar: string;
}

interface MessageData {
  user: User;
  message: string;
}

export default class Socket {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public start(): void {
    this.io.on('connection', socket => {
      socket.broadcast.emit('user_connection', {
        connected: true,
        id: socket.id,
      });

      socket.on('disconnect', () =>
        socket.broadcast.emit('user_connection', {
          connected: false,
          id: socket.id,
        }),
      );

      socket.on('chat', ({ message, user }: MessageData) => {
        logger.info(`message: ${message} - from: ${socket.id} `);
        this.io.emit('chat', { message, user }); // Emit for all connections including the emissor
      });

      socket.on('newuser', (user: User) => {
        logger.info(`newuser: ${user.username}  `);
        socket.broadcast.emit('useronline', user); // Emit for all connections except the emissor
      });
    });
  }
}
