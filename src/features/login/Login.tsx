import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {AuthPayloadType} from "../../api/todolists-api";

// type FormikErrorType = {
//   email?: string
//   password?: string
//   rememberMe?: boolean
// }


export const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const captchaUrl = useSelector<AppRootStateType, string>(state => state.auth.captchaUrl)

  //const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: ''
    },
    validate: (values) => {
      const errors: Partial<AuthPayloadType> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 3) {
        errors.password = 'Min length is 3 characters'
      }
      if (!values.captcha && captchaUrl) {
        errors.captcha = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      //formik.resetForm()
    },
  })

  if (isLoggedIn) {
   return <Navigate to={'/'}/>
    //navigate('/')
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'} rel="noreferrer"> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email
            && formik.errors.email
            && <div style={{color: "red"}}>{formik.errors.email}</div>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password
            && formik.errors.password
            && <div style={{color: "red"}}>{formik.errors.password}</div>}
            {captchaUrl && <img src={captchaUrl} alt={"captcha"}/>}
            {captchaUrl && <TextField
              label="Captcha"
              margin="normal"
              name="captcha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.captcha}
            />}
            {formik.touched.captcha
            && formik.errors.captcha
            && <div style={{color: "red"}}>{formik.errors.captcha}</div>}
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox
                name="rememberMe"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
              />}
            />
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}
//Partial<Omit<AuthPayloadType, 'captcha'>>