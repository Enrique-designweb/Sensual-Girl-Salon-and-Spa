export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

export const users: User[] = [
  {
    id: 'legna',
    name: 'Legna',
    email: 'legna@sensualgirl.com',
    passwordHash: '$2b$10$2b5bTmLQm4/Vhm5wLr0Vye93uK0rU2b3ejV4MhmjT9obieT2b59h6', 
    role: 'specialist',
  },
  {
    id: 'kleyan',
    name: 'Kleyan',
    email: 'kleyan@sensualgirl.com',
    passwordHash: '$2b$10$4UkrP7vxQdTZY1MBDmQ0C.YkbUeiNd2GNLNBomkvhdmDikMbJS1Nq',
    role: 'specialist',
  },
  {
    id: 'admin',
    name: 'Administrador',
    email: 'admin@sensualgirl.com',
    passwordHash: '$2b$10$fevncqiIBQwsWIRykE9LpenDYraCn3Qrsq31MD9uxdQEFPQ50wOLm',
    role: 'admin',
  }
];
