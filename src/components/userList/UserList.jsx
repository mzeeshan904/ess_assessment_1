import React, { useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UserList = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for update

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Update the users state by removing the deleted user
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user); // Set the selected user to be updated
    setShowModal(true); // Show the modal for updating user details
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Reset the selected user
    setShowModal(false); // Close the modal
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${selectedUser.id}`, selectedUser); // Send a PUT request to the server to update the user
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      ); // Update the users state with the updated user details
      setUsers(updatedUsers);
      setShowModal(false); // Close the modal
      setSelectedUser(null); // Reset the selected user
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value })); // Update the selected user's field values when input changes
  };

  return (
    <Container>
      <h3>User List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="username"
                value={selectedUser ? selectedUser.username : ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="firstName"
                value={selectedUser ? selectedUser.firstName : ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="lastName"
                value={selectedUser ? selectedUser.lastName : ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
