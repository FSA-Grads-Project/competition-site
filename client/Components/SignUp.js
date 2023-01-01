// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createUser, updateStatusSignUp } from '../store/auth';

// const SignUp = () => {

//   const { status } = useSelector(state => state.auth);
//   const { error } = useSelector(state => state.auth);

//   const [ formInput, setFormInput ] = useState({
//     username: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     country: '',
//     email: ''
//   });

//   const handleChange = (event) => {
//     setFormInput((prevState) => {
//       return { ...prevState, [ event.target.name ]: event.target.value };
//     });
//   };

//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(createUser(formInput));
//     setFormInput({
//       username: '',
//       password: '',
//       firstName: '',
//       lastName: '',
//       country: '',
//       email: ''
//     });
//   };

//   // Navigate to login only on successful user creation
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (status === 'user created') {
//       navigate('/login');
//       dispatch(updateStatusSignUp());
//     }
//   }, [ status ]);

//   return (
//     <>
//       <h1>Sign up</h1>

//       <form onSubmit={handleSubmit}>

//         {/* styles added inline until integration */}

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
//           type='text'
//           value={formInput.password}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <label style={{marginLeft: '0'}} htmlFor='firstName'>first name</label>
//         <input
//           id='firstName'
//           name='firstName'
//           type='text'
//           value={formInput.firstName}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <label style={{marginLeft: '0'}} htmlFor='lastName'>last name</label>
//         <input
//           id='lastName'
//           name='lastName'
//           type='text'
//           value={formInput.lastName}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <label style={{marginLeft: '0'}} htmlFor='country'>country</label>
//         <input
//           id='country'
//           name='country'
//           type='text'
//           value={formInput.country}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <label style={{marginLeft: '0'}} htmlFor='email'>email address</label>
//         <input
//           id='email'
//           name='email'
//           type='email'
//           value={formInput.email}
//           onChange={handleChange}
//           required
//           style={{border: '1px solid black', display: 'block'}}
//         />

//         <button style={{border: '1px solid black'}}>submit</button>

//       </form>

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

// export default SignUp;
