import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserModal } from '../../store/app';
import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../../utils/axiosClient';
// ADMİN ADD USER İNFORMATİON 

const AddUserModal = () => {
    const dispatch = useDispatch();
    const { showAddUserModal } = useSelector((state) => state.app);

    const closeModal = () => {
        dispatch(toggleUserModal());
    }

    const handleSubmit = async (values) => {
        const res = await axiosClient.post("admin/newuser", values); // POST ADMİN 
        closeModal();
    }

    return (
        <Modal isOpen={showAddUserModal} close={closeModal} className='p-2'>
            <Formik
                initialValues={{
                    fullname: '',
                    username: '',
                    email: '',
                    role: '',
                    tcNo: '',
                    phone: '',
                    licenseNo: ''
                }}
                validationSchema={UserSchema}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}
                render={({ errors, touched }) => (
                    <Form className='flex flex-col space-y-3'>
                        <h2 className='text-lg text-center text-white uppercase'>Kişi Ekle</h2>

                        <Field className='w-full p-2 rounded-sm outline-none' name="fullname" placeholder=" Username" type="text" />
                        <ErrorMessage
                            name="fullname"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="username" placeholder="Username" type="text" />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="email" placeholder="E-mail" type="email" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="role" placeholder="Role" type="text" />
                        <ErrorMessage
                            name="role"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="tcNo" placeholder="TC No" type="text" />
                        <ErrorMessage
                            name="tcNo"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="phone" placeholder="Phone Number" type="text" />
                        <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="licenseNo" placeholder="Plate Number" type="text" />
                        <ErrorMessage
                            name="licenseNo"
                            component="div"
                            className="text-white field-error"
                        />


                        <button type='submit' className='w-full py-2 text-white rounded-sm bg-emerald-600 hover:bg-emerald-800'>AddUser</button>
                    </Form>
                )}
            />
        </Modal>
    )
}

export default AddUserModal