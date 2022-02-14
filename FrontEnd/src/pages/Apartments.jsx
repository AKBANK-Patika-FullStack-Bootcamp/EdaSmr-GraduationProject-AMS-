import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddApartmentModal from '../components/Modals/AddApartmentModal'
import AssignUserModal from '../components/Modals/AssignUserModal'
import CreateInvoiceModal from '../components/Modals/CreateInvoiceModal'
import Table from '../components/Table'
import { toggleAptModal } from '../store/app'
import axiosClient from '../utils/axiosClient'

const Apartments = () => {
    const [data, setData] = useState([])
    const [showAssignUserModal, setShowAssignUserModal] = useState(false)
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)
    const [assignId, setAssignId] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openModal = () => {
        dispatch(toggleAptModal())
    }

    useEffect(async () => {
        const res = await axiosClient.get("apartments")
        setData(res.data);
    }, [])

    const openAssignModal = (id) => { // kişi atama
        setAssignId(id)
        setShowAssignUserModal(true)
    }

    const openInvoiceModal = (id) => { // fatura ekleme
        setAssignId(id)
        setShowInvoiceModal(true)
    }

    const handleRemoveUser = async (id) => { // kişileri kaldırma
        try {
            const res = await axiosClient.post("apartments/remove-user", {
                apartmentId: id
            })

            const datas = [...data]
            const index = datas.findIndex(x => x.id === id)
            datas[index] = res.data
            setData(datas)
        } catch (error) {

        }
    }

    const updateData = (newData) => {
        const datas = [...data]
        const index = datas.findIndex(x => x.id === newData.id)
        datas[index] = newData
        setData(datas)
    }

    const addData = (newData) => {
        setData([...data, newData]);
    }

    const titles = ["Id", "Apartment No", "Blok", "Status", "Floor", "Type", "OwnerUser", ""]

    const goDetail = (id) => {
        navigate(`/apartments/${id}`);
    }

    return (
        <div className='w-full mx-auto md:w-5/6'>
            <div className='flex justify-between mt-5'>
                <h2 className='text-xl uppercase'>Daireler</h2>
                <button onClick={openModal} className='button'>Add new Block</button>
            </div>

            <AddApartmentModal addData={addData} />
            <AssignUserModal updateData={updateData} isOpen={showAssignUserModal} id={assignId} close={() => setShowAssignUserModal(false)} />
            <CreateInvoiceModal id={assignId} isOpen={showInvoiceModal} close={() => setShowInvoiceModal(false)} />

            <Table titles={titles} >
                {
                    data.map((d, index) => (
                        <tr onClick={() => goDetail(d.id)} key={index} className='h-10 cursor-pointer hover:-translate-x-1 odd:bg-white odd:text-gray-700 even:bg-[#F3F3F3]'>
                            <td>{d.id}</td>
                            <td>{d.no}</td>
                            <td>{d.block}</td>
                            <td>{d.isFree ? "Empty" : "Full"}</td>
                            <td>{d.floor}</td>
                            <td>{d.type}</td>
                            <td>{d.user?.userName}</td>
                            <td>
                                {d.isFree ?
                                    <button onClick={() => openAssignModal(d.id)} className='text-sm bg-green-600 button'>Assign User</button>
                                    : <button onClick={() => handleRemoveUser(d.id)} className='text-sm bg-red-600 button'>Remove User</button>}
                                <button onClick={() => openInvoiceModal(d.id)} className='ml-2 text-sm button'>Add Bill</button>
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </div>
    )
}

export default Apartments