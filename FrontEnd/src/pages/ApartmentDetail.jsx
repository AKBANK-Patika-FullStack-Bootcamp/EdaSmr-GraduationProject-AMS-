import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../utils/axiosClient'

const invoiceTypes = ["Elektrik", "Su", "Aidat", "Gaz"]

const ApartmentDetail = () => {
    let { id } = useParams();
    const [data, setData] = useState({})
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [invoiceType, setInvoiceType] = useState(-1)
    const [filteredInvoice, setfilteredInvoice] = useState([])

    useEffect(async () => {
        const res = await axiosClient.get(`apartments/${id}`)
        setData(res.data);
        setfilteredInvoice(res.data.invoices);
    }, [])

    useEffect(() => {
        if (!data || data.invoices?.length === 0 || month < 1) return
        month && filter("month", month)
        year && filter("year", year)
        invoiceType >= 0 && filter("invoiceType", invoiceType)
    }, [month, year, invoiceType])

    const filter = (key, val) => {
        setfilteredInvoice(data.invoices?.filter(x => x[key] == val))
    }

    return (
        <div>
            {/* apartment infos */}
            <div className='flex w-full p-2 text-white bg-gray-600'>
                <div className='grow'>
                    <h2 className='mb-3 text-lg'>Flat İnformation</h2>
                    <ul>
                        <li>Block: {data?.block}</li>
                        <li>Floor: {data?.floor}</li>
                        <li>Apartment No: {data?.no}</li>
                        <li>Apartment Type: {data?.type}</li>
                        <li>Status: {data?.isFree ? "Empty" : "Full"}</li>
                    </ul>
                </div>
                <div className='grow'>
                    <h2 className='mb-3 text-lg'>OwnerUser İnformation</h2>
                    {
                        data?.user ?
                            <div>
                                <ul>
                                    <li>Name Surname: {data?.user?.fullname}</li>
                                    <li> Username: {data?.user?.userName}</li>
                                    <li>E-mail: {data?.user?.email}</li>
                                    <li>Phone Number: {data?.user?.phoneNumber}</li>
                                    <li>TC No: {data?.user?.tcNo}</li>
                                    <li> Plate No: {data?.user?.licenseNo}</li>
                                </ul>
                            </div> :
                            <div>Apartment is Empty</div>
                    }
                </div>
            </div>

            <h3 className='my-4 text-xl'>Bills</h3>
            <div>
                <h4>Filter</h4>
                <div className='flex space-x-2'>
                    <input min={2000} max={2022} value={year} type="number" onChange={e => setYear(e.target.value)} className='px-2' placeholder='Yıl' />
                    <input min={1} max={12} value={month} type="number" onChange={e => setMonth(e.target.value)} className='px-2' placeholder='Ay' />
                    <select value={invoiceType} onChange={e => setInvoiceType(e.target.value)}>
                        <option value={-1}> Please Choose Bills Type...</option>
                        {
                            invoiceTypes.map((type,index) => (
                                <option key={index} value={index}>{type}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div>
                <ul>
                    {
                        filteredInvoice?.map(item => (
                            <li key={item.id} className="flex flex-col p-2 mt-2 bg-white rounded-sm">
                                <span>Bill Type : {invoiceTypes[item.invoiceType]}</span>
                                <span>Year: {item.year}</span>
                                <span>Month: {item.month}</span>
                                <span>Price: {item.price}</span>
                                <span>Paid: {item.isPaid ? "Yes" : "No"}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default ApartmentDetail