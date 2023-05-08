import axios from "axios";
import React, { useState, useEffect } from "react";

const DEFAULT_USER = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: ""
    }
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: ""
  }
};
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>(DEFAULT_USER);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        const sortedUser = response.data.sort((a: User, b: User) =>
          a.name.localeCompare(b.name)
        );
        console.log(sortedUser, "sortedUser");
        setUsers(sortedUser);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(newUser);
    setUsers([...users, newUser]);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value
      }
    }));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      company: {
        ...prevUser.company,
        name: value
      }
    }));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label className="form-control">
          Name:
          <input
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control">
          Email:
          <input
            name="email"
            type="text"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control">
          City:
          <input
            name="city"
            type="text"
            value={newUser.address.city}
            onChange={handleCityChange}
          />
        </label>
        <label className="form-control">
          Company Name:
          <input
            name="companyName"
            type="text"
            value={newUser.company.name}
            onChange={handleCompanyChange}
          />
        </label>
        <button type="submit">Add New</button>
      </form>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Company</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
