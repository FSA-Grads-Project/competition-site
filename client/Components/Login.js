import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
    navigate("/");
  }, []);

  return <div></div>;
};

// const Login = () => {

//   const { status } = useSelector(state => state.auth);
//   const { error } = useSelector(state => state.auth);

//   const [ formInput, setFormInput ] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (event) => {
//     setFormInput((prevState) => {
//       return { ...prevState, [ event.target.name ]: event.target.value };
//     });
//   };

//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(login(formInput));
//     setFormInput({
//       username: '',
//       password: ''
//     });
//   };

//   // Navigate to current issue on successful login only
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (status === 'authenticated') {
//       navigate('/');
//     }
//   }, [ status ]);

//   return (
//     <>
//       <h1>Login to your account</h1>

//       <form onSubmit={handleSubmit}>

//         {/* Styles added inline until integration */}

//         <label style={{marginLeft: '0'}} htmlFor='username'>username</label>
//         <input
//           id='username'
//           name='username'
//           type='text'
//           value={formInput.username}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <label style={{marginLeft: '0'}} htmlFor='password'>password</label>
//         <input
//           id='password'
//           name='password'
//           type='password'
//           value={formInput.password}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <button style={{border: '1px solid black'}}>submit</button>

//       </form>

//       <Link to='/signup'>Don't have an account? Sign-up!</Link>

//       {
//         error ? (
//           <div>{error}</div>
//         ) : (
//           null
//         )
//       }
//     </>
//   );
// };

export default Login;
