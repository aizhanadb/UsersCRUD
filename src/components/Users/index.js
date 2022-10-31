import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import DataTable from "../DataTable";
import Loader from "../Loader";
import Search from "../Search";
import CreateUser from "../CreateUser";
import UpdateUser from "../UpdateUser";
import DeleteUser from "../DeleteUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });
  const [currentUser, setCurrentUser] = useState({});
  const [value, setValue] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://632e1123b37236d2ebe5af2c.mockapi.io/users"
      );
      setUsers(res.data);
      console.log(users);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const createUser = async (user) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://632e1123b37236d2ebe5af2c.mockapi.io/users",
        user
      );

      setUsers([...users, res.data]);
    } catch (err) {
      console.error(`Error creating users`, err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (currentUser) => {
    setLoading(true);
    setModal(false);

    try {
      const res = await axios.put(
        `https://632e1123b37236d2ebe5af2c.mockapi.io/users/${currentUser.id}`,
        currentUser
      );
      const copyUsers = [...users];
      // const findUser = copyUsers.find((user) => {return user.id === currentUser.id});
      // const findUserIndex = copyUsers.indexOf(findUser);
      const findUserIndex = copyUsers.findIndex(
        (copyUser) => copyUser.id === currentUser.id
      );

      const newUsers = copyUsers.splice(findUserIndex, 1, currentUser);
      // console.log(newUsers);
      setUsers(copyUsers);
      // console.log(findUserIndex);
    } catch (err) {
      console.error("Error updating user", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setModal(false);

    try {
      const res = await axios.delete(
        `https://632e1123b37236d2ebe5af2c.mockapi.io/users/${id}`
      );

      const copyUsers = [...users];
      const filteredUsers = copyUsers.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error deleting user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRow = (user) => {
    setModal({ name: "Update User", active: true });
    setCurrentUser({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
      birthdate: user.birthdate
    });
  };

  const deleteRow = (user) => {
    setModal({ name: "Delete User", active: true });
    setCurrentUser({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
      birthdate: user.birthdate
    });
  };

  const search = () => {
    const keys = ["firstname", "lastname", "email"];
    return users.filter((user) => {
      return keys.some((key) =>
        user[key].toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  if (value !== "") {
    console.log(search(users));
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-3">
            <Col className="text-start">
              <Search value={value} setValue={setValue} search={search} />
            </Col>

            <Col className="text-end">
              <Button
                onClick={() => setModal({ name: "Create User", active: true })}
              >
                Create New User
              </Button>
            </Col>
          </Row>
          <DataTable
            users={search(users)}
            updateRow={updateRow}
            deleteRow={deleteRow}
          />
        </>
      )}

      {modal.active && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          {modal.name === "Create User" && (
            <CreateUser
              modal={modal}
              setModal={setModal}
              createUser={createUser}
            />
          )}
        </Modal>
      )}

      {modal.name === "Update User" && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          <UpdateUser
            modal={modal}
            setModal={setModal}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
            updateUser={updateUser}
          />
        </Modal>
      )}

      {modal.name === "Delete User" && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          <DeleteUser
            modal={modal}
            setModal={setModal}
            currentUser={currentUser}
            deleteUser={deleteUser}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Users;
