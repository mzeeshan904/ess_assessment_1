

import { useEffect, useState } from "react";
import AddUserForm from "./components/addUserForm/AddUserForm"
import Header from "./components/header/Header"
import UserList from "./components/userList/UserList"
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]); // State to store the users
      // Fetch users from the server when the component mounts
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users'); // Make a GET request to the users API
          // console.log(response.data);
          setUsers(response.data); // Update the users state with the fetched data
        } catch (error) {
          console.error(error);
        }
      };


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <>
      <Header/>
      <AddUserForm fetchUsers={fetchUsers}/>
      <UserList users={users} setUsers={setUsers}/>
    </>
  )
}

export default App
