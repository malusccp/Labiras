export interface User {
  id: string;
  username: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  username: string;
  password: string;

  constructor(id: string, name: string, username: string, password: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static fromDb(row: any): User {
    return new User(row.id, row.name, row.username, row.password);
  }

  static allFromDb(rows: any[]): User[] {
    return rows.map((row) => User.fromDb(row));
  }
}
