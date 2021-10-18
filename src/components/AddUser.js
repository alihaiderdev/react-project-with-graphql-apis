import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CREATE_USER } from '../graphql/mutations';

const AddUser = () => {
  const [userData, setUserData] = useState({ name: '', email: '', gender: '', status: '' });
  const { name, email, gender, status } = userData;

  const [createUser, { error }] = useMutation(CREATE_USER);
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const userDataformSubmit = () => {
    console.log('userData : ', userData);
    const modifiedUserData = { ...userData, status: Number(status) };
    createUser({
      //   variables: userData,
      variables: modifiedUserData,
    });
  };
  return (
    <div className='addUser'>
      <Container className='mt-5'>
        <div className='add-user'>
          <h1>Add User</h1>
          <div>
            <Link to='/user-list'>All Users</Link>
          </div>
        </div>
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
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
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
          <button type='button' class='btn btn-primary' onClick={userDataformSubmit}>
            Add User
          </button>
        </form>
      </Container>
    </div>
  );
};

export default AddUser;
