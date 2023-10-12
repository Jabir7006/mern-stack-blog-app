import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';

const UserProfile = () => {
    // const {id} = useParams();
    // const [blogs, setBlogs] = useState([]);
    // const [loading, setLoading, loadingSpinner] = useLogin();
    // const {token} = useContext(UserContext);
    // const handleGetUserBlogs = async () => {
    //     setLoading(true);
    
    //     try {
    //       const response = await axios.get(`http://localhost:3000/api/blogs/user/${id}`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    
    //       if (response.status === 200) {
    //         const { user } = response.data.payload;
    //         setBlogs(user.blogs);
    //         setLoading(false);
    //       }
    //     } catch (error) {
    //       setLoading(false);
    //       toast.error(error.response?.data?.message);
    //     }
    //   };
    
    //   console.log(blogs);
    
    
    //   useEffect(() => {
    //     handleGetUserBlogs();
    //   }, []);

  return (
    <div>gfvbfd</div>
  )
}

export default UserProfile