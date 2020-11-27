import {User} from './user';

export class Post {
  id: number;
  user: User;
  userId: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
