import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  // console.log(users);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  // Toggle user role (admin <-> user)
  const toggleAdmin = async (user) => {
    try {
      const res = await axiosSecure.put(`/users/admin/${user._id}`); // no need to send body
      if (res.data.modifiedCount > 0) {
        fetchUsers(); // Refresh after role toggle
      }
    } catch (err) {
      console.error('Failed to toggle role:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto p-6 bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={user.photoURL || 'https://i.ibb.co/yY5nH3z/default-avatar.png'}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td>{user.name || 'No Name'}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role || 'user'}</td>
              <td>
                <button
                  className={`btn btn-xs ${
                    user.role === 'admin' ? 'btn-error' : 'btn-primary'
                  }`}
                  onClick={() => toggleAdmin(user)}
                >
                  {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
