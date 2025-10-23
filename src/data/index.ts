import type { Contact } from "../types/contact";
import { User } from "../types/users";

export const datos: Contact[] = [
  {
    id: "1",
    name: "Juan",
    email: "juan@gmail.com",
    phone: "1234567890",
    address: "Calle 123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Maria",
    email: "maria@gmail.com",
    phone: "1234567890",
    address: "Calle 123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Pedro",
    email: "pedro@gmail.com",
    phone: "1234567890",
    address: "Calle 123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Ana",
    email: "ana@gmail.com",
    phone: "1234567890",
    address: "Calle 123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Luis",
    email: "luis@gmail.com",
    phone: "1234567890",
    address: "Calle 123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Juan",
    email: "juan@gmail.com",
    password: "1234567890",
    phone: "1234567890",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Maria",
    email: "maria@gmail.com",
    password: "1234567890",
    phone: "1234567890",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Pedro",
    email: "pedro@gmail.com",
    password: "1234567890",
    phone: "1234567890",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Ana",
    email: "ana@gmail.com",
    password: "1234567890",
    phone: "1234567890",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Luis",
    email: "luis@gmail.com",
    password: "1234567890",
    phone: "1234567890",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Funciones de utilidad para usuarios
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};