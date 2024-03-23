import React from 'react'
import axios from 'axios'
import {login as authLogin} from '../store/authSlice'
import {
  Input,
  Button,

} from './index.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const value = async(e) => {
    e.preventDefault();
    const { fname, lname, email, password, username, avatar, coverImage } = e.target;
    const form = new FormData(); 

    //appending files
    form.append('avatar', avatar.files[0]);
    form.append('coverImage', coverImage.files[0]);

    //appending other data
    form.append('fullName', fname.value+" "+lname.value);
    form.append('email', email.value);
    form.append('username', username.value);
    form.append('password', password.value);

    try {
      const data = await axios.post('/api/v1/users/register', form,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
    
  }


  return (
    <>
        <div className='flex justify-center items-center w-full' style={{height: '90vh'}}>
            <div className='border-2 border-gray-800 rounded-lg flex flex-col gap-2 justify-center items-center w-1/3 bg-gray-500' style={{height: '82vh'}}>
              <h1 className='font-bold text-5xl'>SIGN UP</h1>
              <form className='flex flex-col items-center' style={{width: '100%'}}
                onSubmit={(e) => value(e)}
              >  
                <Input name="fname" className='w-3/4' label="First Name" type="text" placeholder="First Name" />
                <Input name="lname" className='w-3/4' label="Last Name" type="text" placeholder="Last Name" /> 
                <Input name="email" className='w-3/4' label="Email" type="email" placeholder="Email" />
                <Input name="username" className='w-3/4' label="Username" type="text" placeholder="Username" />
                <Input name="avatar" className='w-3/4' label="Avatar" type="file" placeholder="avatar" />
                <Input name="coverImage" className='w-3/4' label="CoverImage" type="file" placeholder="CoverImage" />
                <Input name="password" className='w-3/4' label="Password" type="password" placeholder="Password" />
                <Button type='submit' label='SignUp' classname='w-full'/>
              </form>
              <Link to='/login' className='text-white hover:text-gray-700'>Already have an account? Sign In</Link>
            </div>
        </div>
    </>
  )
}

export default Register