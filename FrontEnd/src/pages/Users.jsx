import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddUserModal from '../components/Modals/AddUserModal'
import Table from '../components/Table'
import { toggleUserModal } from '../store/app'
import axiosClient from '../utils/axiosClient'

const Users = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(async () => {
    const res = await axiosClient.get("admin/users")
    console.log(res.data);
    setData(res.data);
  }, [])

  const openModal = () => {
    dispatch(toggleUserModal())
  }

  const titles = ["ID", "Name Surname","TC NO", "E-mail", "Username", "Phone Number", "Plate Number"]

  return (
    <div className='w-full mx-auto md:w-5/6'>
      <div className='flex justify-between mt-5'>
        <h2 className='text-xl uppercase'>Users</h2>
        <button onClick={openModal} className='button'>Add User</button>
      </div>

      <AddUserModal />

      <Table titles={titles} >
        {
          data.map((d, index) => (
            <tr key={index} className='h-10 odd:bg-white odd:text-gray-700 even:bg-[#F3F3F3]'>
              <td>{index+1}</td>
              <td>{d.fullname}</td>
              <td>{d.tcNo}</td>
              <td>{d.email}</td>
              <td>{d.userName}</td>
              <td>{d.phoneNumber}</td>
              <td>{d.licenseNo}</td>
            </tr>
          ))
        }
      </Table>
    </div>
  )
}

export default Users