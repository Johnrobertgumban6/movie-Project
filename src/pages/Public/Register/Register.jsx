import { useState, useRef, useCallback, useEffect } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import './Register.css'

function Register() {
=======
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function RegisterPage() {
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
<<<<<<< HEAD
  const [contactNo, setContactNo] = useState('');
=======
  const [contactNo, setcontactNo] = useState('');
  const [role, setRole] = useState('');
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
<<<<<<< HEAD
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password, firstName, middleName, lastName, contactNo }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState("failed");
=======
  const roleRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password, firstName, middleName, lastName, contactNo, role }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
<<<<<<< HEAD
  }, []);
=======
  }, [isShowPassword]);
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);
<<<<<<< HEAD
    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
=======

    switch (type) {
      case 'email':
        setEmail(event.target.value);

        break;

      case 'password':
        setPassword(event.target.value);
        break;
      
      case 'firstName':
        setFirstName(event.target.value);
        break;

      case 'middleName':
        setMiddleName(event.target.value);
        break;

      case 'lastName':
        setLastName(event.target.value);
        break;


      case 'contactNo':
        setcontactNo(event.target.value);
        break;

      case 'role':
        setRole(event.target.value);
        break;

>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
      default:
        break;
    }
  };

<<<<<<< HEAD
  let apiEndpoint;

  if (window.location.pathname.includes('/admin')) {
    apiEndpoint = '/admin/register';
  } else {
    apiEndpoint = '/user/register';
  };

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');
    await axios({
      method: 'post',
      url: apiEndpoint,
=======
  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo, role };
    setStatus('loading');
    console.log(data);

    await axios({
      method: 'post',
      url: '/admin/register',
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.data.access_token);
<<<<<<< HEAD

        
        setIsError("success");
        setAlertMessage(res.data.message);
        setTimeout(() => {
          navigate('/');
          setStatus('idle');
        }, 3000);
=======
        navigate('/');
        setStatus('idle');
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
      })
      .catch((e) => {
        console.log(e);
        setStatus('idle');
<<<<<<< HEAD

        setIsError("failed");
        setAlertMessage(e.response?.data?.message || e.message);
        setTimeout(() => setAlertMessage(''), 3000);
=======
        alert(e.response.data.message);
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
      });
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
<<<<<<< HEAD
      <div className='registermain-container'>
        <form>
          <div className='registerform-container'>
            <h3>Register</h3>
            <div>
              <div>
                {debounceState && isFieldsDirty && firstName === '' && (
                  <span className='errors'>*This field cannot be left empty</span>
                )}
                <div className='registerform-group'>
                  <label>First Name:</label>
                  <input
                    type='text'
                    name='firstName'
                    ref={firstNameRef}
                    onChange={(e) => handleOnChange(e, 'firstName')}
                    required
                  />
                </div>
              </div>
              <div>
                {debounceState && isFieldsDirty && middleName === '' && (
                  <span className='errors'>*This field cannot be left empty</span>
                )}
                <div className='registerform-group'>
                  <label>Middle Name:</label>
                  <input
                    type='text'
                    name='middleName'
                    ref={middleNameRef}
                    onChange={(e) => handleOnChange(e, 'middleName')}
                  />
                </div>
              </div>
              <div>
                {debounceState && isFieldsDirty && lastName === '' && (
                  <span className='errors'>*This field cannot be left empty</span>
                )}
                <div className='registerform-group'>
                  <label>Last Name:</label>
                  <input
                    type='text'
                    name='lastName'
                    ref={lastNameRef}
                    onChange={(e) => handleOnChange(e, 'lastName')}
                    required
                  />
                </div>
              </div>
              <div>
                {debounceState && isFieldsDirty && contactNo === '' && (
                  <span className='errors'>*This field cannot be left empty</span>
                )}
                <div className='registerform-group'>
                  <label>Contact Number:</label>
                  <input
                    type='text'
                    name='contactNo'
                    ref={contactNoRef}
                    onChange={(e) => handleOnChange(e, 'contactNo')}
                    required
                  />
                </div>
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>*This field cannot be left empty</span>
              )}
              <div className='registerform-group'>
=======
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div>
            <div>
              <div className='form-group'>
                <label>First Name:</label>
                <input
                  type='text'
                  name='firstName'
                  ref={firstNameRef}
                  onChange={(e) => handleOnChange(e, 'firstName')}
                />
              </div>
              {debounceState && isFieldsDirty && firstName == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Middle Name:</label>
                <input
                  type='text'
                  name='middleName'
                  ref={middleNameRef}
                  onChange={(e) => handleOnChange(e, 'middleName')}
                />
              </div>
              {debounceState && isFieldsDirty && middleName == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Last Name:</label>
                <input
                  type='text'
                  name='lastName'
                  ref={lastNameRef}
                  onChange={(e) => handleOnChange(e, 'lastName')}
                />
              </div>
              {debounceState && isFieldsDirty && lastName == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Contact Number:</label>
                <input
                  type='text'
                  name='contactNo'
                  ref={contactNoRef}
                  onChange={(e) => handleOnChange(e, 'contactNo')}
                />
              </div>
              {debounceState && isFieldsDirty && contactNo == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Role:</label>
                <input
                  type='text'
                  name='role'
                  ref={roleRef}
                  onChange={(e) => handleOnChange(e, 'role')}
                />
              </div>
              {debounceState && isFieldsDirty && role == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
              <div className='form-group'>
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
                <label>Email:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'email')}
<<<<<<< HEAD
                  required
                />
              </div>
            </div>
            <div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>*This field cannot be left empty</span>
              )}
              <div className='registerform-group'>
                <label>Password:</label>
                <div className='registerpassword-container'>
                  <input
                    type={isShowPassword ? 'text' : 'password'}
                    name='password'
                    ref={passwordRef}
                    onChange={(e) => handleOnChange(e, 'password')}
                    required
                  />
                  <div className='registershow-password'>
                    <input
                      type='checkbox'
                      checked={isShowPassword}
                      onChange={handleShowPassword}
                    />
                    <label>Show Password</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='register-container'>
=======
                />
              </div>
              {debounceState && isFieldsDirty && email == '' && (
                <span className='errors'>This field is required</span>
              )}
              </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>


            <div className='submit-container'>
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
<<<<<<< HEAD
                  if (email && password && firstName && middleName && lastName && contactNo) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') emailRef.current.focus();
                    if (password === '') passwordRef.current.focus();
=======
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password) {
                    handleRegister({
                      type: 'register',
                      user: { email, password, firstName,middleName,lastName,contactNo,role },
                    });
                  } else {
                    setIsFieldsDirty(true);
                    if (email == '') {
                      emailRef.current.focus();
                    }
                    if (password == '') {
                      passwordRef.current.focus();
                    }
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='register-container'>
<<<<<<< HEAD
              <span><small>Already have an account? <a href='/'>Login</a></small></span>
=======
              <span><small>Already have an account?<a href='/'>Login</a></small></span>
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Register;
=======
export default RegisterPage;
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
