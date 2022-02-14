import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axiosClient from '../../utils/axiosClient';

const AssignUserModal = ({ isOpen, close, id, updateData }) => {
    const [users, setUsers] = useState([])

    useEffect(async () => {
        const res = await axiosClient.get("admin/users")
        setUsers(res.data)

    }, [])


    const handleSubmit = async (values) => {
        values.ownerType = parseInt(values.ownerType);
        const res = await axiosClient.post("apartments/assign-user", values);
        updateData(res.data);
        close();
    }

    return (
        <Modal isOpen={isOpen} close={close} className='p-2'>
            <Formik
                initialValues={{
                    apartmentId: id,
                    userId: "",
                    ownerType: -1
                }}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}>
                {({ errors, touched }) => (
                    <Form className='flex flex-col space-y-3'>
                        <h2 className='text-lg text-center text-white uppercase'>Assign User To Apartment</h2>

                        <Field disabled className='w-full p-2 rounded-sm outline-none' name="apartmentId" placeholder="Blok Code" type="text" />
                        <ErrorMessage
                            name="apartmentId"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="userId" placeholder="User" as="select">
                            <option value={""}>Choose User Please...</option>
                            {
                                users.map(u => (
                                    <option key={u.id} value={u.id}>{u.userName}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage
                            name="userId"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="ownerType" placeholder="Owner Status" type="number" as="select">
                            <option value={-1}>Choose Owner Status..</option>
                            <option value={0}>HomeOwner</option>
                            <option value={1}>Tenant</option>
                        </Field>
                        <ErrorMessage
                            name="ownerType"
                            component="div"
                            className="text-white field-error"
                        />

                        <button type='submit' className='w-full py-2 text-white rounded-sm bg-emerald-600 hover:bg-emerald-800'>Assign</button>
                    </Form>
                )}
            </Formik >
        </Modal >
    )
}

export default AssignUserModal