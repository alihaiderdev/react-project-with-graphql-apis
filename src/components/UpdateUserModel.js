import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UPDATE_USER } from '../graphql/mutations';

const UpdateUserModel = (props) => {
  const {
    show,
    onHide,
    setModalShow,
    // selectedUserInfo: { id, name, email, gender, status },
    selectedUserInfo,
  } = props;
  console.log('selectedUserInfo : ', selectedUserInfo);
  const [userData, setUserData] = useState({
    // name: selectedUserInfo.name !== '' ? selectedUserInfo.name : '',
    // email: selectedUserInfo.email !== '' ? selectedUserInfo.email : '',
    // gender: selectedUserInfo.gender !== '' ? selectedUserInfo.gender : '',
    // status: selectedUserInfo.status !== '' ? selectedUserInfo.status : '',
    name: '',
    email: '',
    gender: '',
    status: '',
  });
  const { name, email, gender, status } = userData;

  useEffect(() => {
    if (selectedUserInfo !== null) {
      setUserData({
        name: selectedUserInfo.name,
        email: selectedUserInfo.email,
        gender: selectedUserInfo.gender,
        status: selectedUserInfo.status,
      });
    }
  }, [selectedUserInfo]);

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const userDataUpdateHandler = () => {
    console.log('userData : ', userData);
    const modifiedUserData = { ...userData, status: Number(status) };
    updateUser({
      //   variables: userData,
      variables: modifiedUserData,
    });
    onHide();
  };
  return (
    <div className='updateUser'>
      <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Update User</Modal.Title>
          {/* <Link to='/user-list'>All Users</Link> */}
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class='mb-3'>
              <label for='email' class='form-label'>
                Name:
              </label>
              <input className='form-control' type='text' placeholder='Enter your name' name='name' onChange={inputChangeHandler} value={name} />
            </div>
            <div class='mb-3'>
              <label for='email' class='form-label'>
                Email:
              </label>
              <input className='form-control' type='email' placeholder='Enter your email' name='email' onChange={inputChangeHandler} value={email} />
            </div>
            <div class='mb-3'>
              <label for='exampleInputPassword1' class='form-label'>
                Gender:
              </label>
              <select class='form-select' aria-label='Default select example' name='gender' onChange={inputChangeHandler} value={gender}>
                <option value='' selected>
                  Please Select Gender
                </option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div class='mb-3'>
              <label for='exampleInputPassword1' class='form-label'>
                Status:
              </label>
              <select class='form-select' aria-label='Default select example' name='status' onChange={inputChangeHandler} value={status}>
                <option value='' selected>
                  Please Select Status
                </option>
                <option value='1'>1</option>
                <option value='0'>0</option>
              </select>
            </div>
            <Button type='button' onClick={() => userDataUpdateHandler}>
              Update User
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateUserModel;
