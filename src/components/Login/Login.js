import React, { useState, useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { act } from 'react-dom/test-utils';
import LoginContext from '../Context/login-context';
import Input from '../UI/Input/Input';

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



const Login = () => {
  const ctx = useContext(LoginContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value: '',isValid: '' });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value: '', isValid:''})
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value: '', isValid: ''})

  const {isValid: emailValid} = emailState;
  const {isValid: passwordValid} = passwordState;
  const {isValid: collegeValid} = collegeState;
  useEffect(()=>{
    const userTypeFinished =  setTimeout(()=>{
      console.log("Checking form validity");
      setFormIsValid(
        emailState.isValid && passwordState.isValid && collegeState.isValid
      );
    },1000)

    return () =>{
      console.log("Clear timeout....");
      clearTimeout(userTypeFinished)
    }
    
  }, [emailState,passwordState,collegeState])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'newEmail', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'newPass', val: event.target.value})
  };

  const collegeNameHandler = (event) =>{
    dispatchCollege({type: 'newCollege', val: event.target.value})
  }

  const validateEmailHandler = () => {
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
    ctx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        id='email'
        label='Email'
        type='email'
        isValid = {emailValid}
        value = {emailState.value}
        onChange = {emailChangeHandler}
        onBlur = {validateEmailHandler}
        />

      <Input 
        id='password'
        label='Password'
        type='password'
        isValid = {passwordValid}
        value = {passwordState.value}
        onChange = {passwordChangeHandler}
        onBlur = {validatePasswordHandler}
        />

      <Input 
        id='college'
        label='College'
        type='text'
        isValid = {collegeValid}
        value = {collegeState.value}
        onChange = {collegeNameHandler}
        onBlur = {validateCollegeHandler}
        />
        
        
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
