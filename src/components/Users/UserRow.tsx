import React from "react";
import { User } from "./UserTable";

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <img
          src={user.avatar}
          className="img-fluid img-thumbnail"
          alt={`{user.first_name} + avatar`}
        />
      </td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
    </tr>
  );
};

export default UserRow;
