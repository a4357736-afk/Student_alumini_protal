import { INITIAL_STUDENTS } from './initialStudents';
import { INITIAL_ALUMNI } from './initialAlumni';

export const getSeedUsers = () => {
  const users = [];

  INITIAL_STUDENTS.forEach(stu => {
    users.push({
      id: stu.id,
      username: stu.username,
      password: stu.password,
      role: stu.role,
      name: stu.name,
      email: stu.email
    });
  });

  INITIAL_ALUMNI.forEach(alu => {
    users.push({
      id: alu.id,
      username: alu.username,
      password: alu.password,
      role: alu.role,
      name: alu.name,
      email: alu.email
    });
  });

  return users;
};
