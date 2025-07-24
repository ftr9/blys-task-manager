import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import pool from '../config/db';
import { IUser } from '../@types';


class User {
  // Create a new user
  static async create(name: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute<IUser[]>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    const [user] = await pool.execute<IUser[]>(
      'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
      [(result as any).insertId]
    );
    
    return user[0];
  }

  // Find user by email
  static async findByEmail(email: string): Promise<IUser | null> {
    const [users] = await pool.execute<IUser[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users.length ? users[0] : null;
  }

  // Find user by ID
  static async findById(id: number): Promise<IUser | null> {
    const [users] = await pool.execute<IUser[]>(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    );
    return users.length ? users[0] : null;
  }

  // Verify password
  static async verifyPassword(user: IUser, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}

export default User;
