import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_USER_LIST } from '../graphql/queries';
import moment from 'moment';
import { DELETE_USER, UPDATE_USER } from '../graphql/mutations';
import UpdateUserModel from './UpdateUserModel';

const UserList = () => {
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const { data } = useQuery(GET_USER_LIST);
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  console.log('data : ', data);
  const handleUserDelete = (id) => {
    deleteUser({
      variables: {
        id: id,
      },
    });
  };

  const openUserUpdateDataModel = (user) => {
    setModalShow(true);
    console.log('model user : ', user);
    setSelectedUserInfo(user);
  };
  return (
    <div className='userList'>
      {/* <Container className='d-flex h-100 align-items-center justify-content-center'> */}
      <Container className='mt-10'>
        <div className='add-user'>
          <h1>
            Users List : <Link to='/home'>Add User</Link>{' '}
          </h1>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>UserId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              {/* <th>User Creation Time</th> */}
              {/* <th>User Updation Time</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.usersList &&
              data.usersList.length > 0 &&
              data.usersList.map((user, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.status}</td>
                    {/* <td>{moment(user.createdAt).format('LLLL')}</td> */}
                    {/* <td>{moment(user.updatedAt).format('LLLL')}</td> */}
                    <td>
                      <Button
                        variant='primary'
                        type='button'
                        onClick={() => {
                          openUserUpdateDataModel(user);
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant='danger' type='button' onClick={() => handleUserDelete(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
      <UpdateUserModel show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow} selectedUserInfo={selectedUserInfo} />
    </div>
  );
};

export default UserList;
