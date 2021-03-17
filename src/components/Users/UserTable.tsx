import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";

interface UserTableProps {}

const USERS_URL = "https://reqres.in/api/users?page=";

export interface User {
  avatar: string;
  email: string;
  id: number;
  last_name: string;
  first_name: string;
}

const fetchUsersByPage = async (page: number) => {
  const usersResponse = await fetch(USERS_URL + page);
  const usersJson = await usersResponse.json();
  return usersJson;
};

const UserTable: React.FC<UserTableProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersForDisplay, setUsersForDisplay] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let fetchedUsers: any = [];
        let page = 1;

        let { data, total_pages } = await fetchUsersByPage(page);
        fetchedUsers = [...fetchedUsers, ...data];
        while (page < total_pages) {
          page++;
          data = (await fetchUsersByPage(page)).data;
          fetchedUsers = [...fetchedUsers, ...data];
        }
        setUsers(fetchedUsers);
        setUsersForDisplay(fetchedUsers);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      console.log("i got triggered", search);
      setUsersForDisplay(
        users.filter((user) => {
          return user.first_name.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else setUsersForDisplay(users);
  }, [search]);

  return (
    <div>
      <div className="form-group">
        <label htmlFor="">Search users</label>
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table  table-responsive ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Avatar</th>
            <th scope="col">First name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length
            ? usersForDisplay.length
              ? usersForDisplay.map((user) => (
                  <UserRow key={user.id} {...{ user }} />
                ))
              : "No users found"
            : "Loading users..."}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
