import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/auth'
import * as Yup from 'yup';
import axiosClient from '../utils/axiosClient';


const Login = () => {
    const dispatch = useDispatch()

    const handleLogin = async (values) => {
        try {
            const res = await axiosClient.post("auth/login", values)

            localStorage.setItem("user", JSON.stringify({
                token: res.data.token,
                roles: res.data.roles,
                user: res.data.user
            }));
            dispatch(loginSuccess(res.data))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            
            onSubmit={(values, { resetForm }) => {
                handleLogin(values);
                resetForm();
            }}>
            {({ errors, touched }) => (
                <Form>
                    <h1 className='mb-10 text-2xl font-semibold text-center uppercase'>Giriş Yap</h1>

                    <Field className='input' name="username" placeholder=" Username" type="text" />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="text-white field-error"
                    />

                    <Field className='input' name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-white field-error"
                    />

                    <button type='submit' className='w-full py-2 text-white rounded-sm bg-emerald-600 hover:bg-emerald-800'>Login</button>
                </Form>
            )}
        </Formik>
    )
}

export default Login