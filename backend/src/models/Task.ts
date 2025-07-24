import mysql from 'mysql2/promise';
import pool from '../config/db';
import { ITaskCreate, ITaskUpdate, ITask, ITaskMetricByStatus } from '../@types';


class Task {
  // Create a new task
  static async create(taskData: ITaskCreate): Promise<ITask> {
    const { userId, title, description, priority, status, endDate } = taskData;
    
    const [result] = await pool.execute(
      `INSERT INTO tasks (user_id, title, description, priority, status, end_date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, title, description || null, priority, status, endDate || null]
    );
    
    const [tasks] = await pool.execute<ITask[]>(
      'SELECT * FROM tasks WHERE id = ?',
      [(result as any).insertId]
    );
    
    return tasks[0];
  }

  // Get all tasks for a user with pagination and sorting
  static async findAll(
    userId: number, 
    page: number = 1, 
    limit: number = 10, 
    sortBy: string = 'created_at', 
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ): Promise<{ tasks: ITask[], totalTasks: number,metricByStatus: ITaskMetricByStatus[] }> {

    const offset = (page - 1) * limit;
    
    // Validate sort column to prevent SQL injection
    const validSortColumns = ['created_at', 'end_date', 'priority'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    
    const [tasks] = await pool.query<ITask[]>(
      `SELECT * FROM tasks 
       WHERE user_id = ? 
       ORDER BY ${pool.escapeId(sortColumn)} ${order} 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    

    //total count of each tasks status 
    /**
     * For example
     * [{total:1,status:"in_progress"},{total:2,status:"pending"},{total:3,status:"completed"}]
     */
    const [countByStatus] = await pool.execute<mysql.RowDataPacket[]>(
      'SELECT COUNT(*) as total,status FROM tasks WHERE user_id = ? GROUP BY status',
      [userId]
    ) 
    const metricByStatus = countByStatus as ITaskMetricByStatus[]

    // Get total count of tasks for pagination
    const totalTasks = metricByStatus.reduce((total, row) => total + row.total, 0);
    return { tasks,totalTasks,metricByStatus};
  }

  // Find a task by ID
  static async findById(id: number, userId: number): Promise<ITask | null> {
    const [tasks] = await pool.execute<ITask[]>(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return tasks.length ? tasks[0] : null;
  }

  // Update a task
  static async update(id: number, userId: number, updateData: ITaskUpdate): Promise<ITask | null> {
    const fields = [];
    const values = [];
    
    // Build the dynamic update query
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase(); // Convert camelCase to snake_case
        fields.push(`${dbField} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) {
      return this.findById(id, userId);
    }
    
    // Add updated_at timestamp
    fields.push('updated_at = CURRENT_TIMESTAMP');
    
    await pool.execute(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      [...values, id, userId]
    );
    
    return this.findById(id, userId);
  }

  // Delete a task
  static async delete(id: number, userId: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return (result as any).affectedRows > 0;
  }
}

export default Task;
