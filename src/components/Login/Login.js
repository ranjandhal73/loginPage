import React, { useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { act } from 'react-dom/test-utils';

const emailReducer = (state,action) =>{
      if(action.type === 'newEmail'){
        return {value: action.val, isValid: action.val.includes('@')}
      }
      if(action.type === 'inputBlur'){
        return {value: state.value, isValid: state.value.includes('@')}
      }

      return state;
}

const passwordReducer = (state,action) =>{
      if(action.type === 'newPass'){
        return {value: action.val, isValid: action.val.trim().length > 6}
      }
      if(action.type === 'inputBlur'){
        return {value: state.value, isValid: state.value.trim().length > 6}
      }
      return state;
}

const collegeReducer = (state, action) =>{
      if(action.type === 'newCollege'){
        return {value: action.val, isValid: action.val.trim().length > 2}
      }
      if(action.type === 'inputBlur'){
        return {value: state.value, isValid: state.value.trim().length > 2}
      }
  return state;
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value: '',isValid: '' });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value: '', isValid:''})
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value: '', isValid: ''})

  const {isValid: emaValid} = emailState;
  useEffect(()=>{
    const userTypeFinished =  setTimeout(()=>{
      console.log("Checking form validity");
      setFormIsValid(
        emailState.isValid && passwordState.isValid && collegeState.isValid
      );
    },1000)

    return () =>{
      clearTimeout(userTypeFinished)
    }
    
  }, [emaValid,passwordState,collegeState])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'newEmail', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && collegeState.isValid
    // );

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'newPass', val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && collegeState.isValid
    // );
  };

  const collegeNameHandler = (event) =>{
    dispatchCollege({type: 'newCollege', val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid  && collegeState.isValid 
    // );
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(currentEmailState.isValid);
    dispatchEmail({type: 'inputBlur'})
  };

  const validateCollegeHandler = () =>{
    dispatchCollege({type: 'inputBlur'})
  }

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'inputBlur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}>
        <label htmlFor="college-name">College Name</label>
          <input
            type="text"
            id="college-name"
            value={collegeState.value}
            onChange={collegeNameHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
