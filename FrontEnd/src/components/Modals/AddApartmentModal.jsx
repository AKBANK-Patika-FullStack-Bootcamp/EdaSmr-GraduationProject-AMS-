import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAptModal } from '../../store/app';
import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../../utils/axiosClient';

// ADMİN ADD APARTMENT İNFORMATİON
const AddApartmentModal = ({ addData }) => {
    const dispatch = useDispatch(); //redux kullandım
    const { showAddAptModal } = useSelector((state) => state.app);

    const closeModal = () => {
        dispatch(toggleAptModal());
    }

    const handleSubmit = async (values) => { // apartman bilgilerini girip kaydetmek (eklemeye) yarar
        const res = await axiosClient.post("apartments", values);
        addData(res.data);
        closeModal();
    }

    return (
        <Modal isOpen={showAddAptModal} close={closeModal} className='p-2'>
            <Formik
                initialValues={{
                    block: '',
                    type: '',
                    floor: '',
                    no: ''
                }}
               
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}>
                {({ errors, touched }) => (
                    <Form className='flex flex-col space-y-3'>
                        <h2 className='text-lg text-center text-white uppercase'>Daire Ekle</h2>

                        <Field className='w-full p-2 rounded-sm outline-none' name="block" placeholder="Blok Code" type="text" />
                        <ErrorMessage
                            name="block"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="type" placeholder="Apartment Type" type="text" />
                        <ErrorMessage
                            name="type"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="floor" placeholder="Kat" type="number" />
                        <ErrorMessage
                            name="floor"
                            component="div"
                            className="text-white field-error"
                        />

                        <Field className='w-full p-2 rounded-sm outline-none' name="no" placeholder="Number of Door" type="number" />
                        <ErrorMessage
                            name="no"
                            component="div"
                            className="text-white field-error"
                        />


                        <button type='submit' className='w-full py-2 text-white rounded-sm bg-emerald-600 hover:bg-emerald-800'>Add Apartment</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default AddApartmentModal