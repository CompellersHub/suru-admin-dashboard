import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useCreateLogisticsCompany, useResendLogisticsCredentials } from '../../hooks/logisticCompanyApi'
import { toast } from 'react-toastify'

const LogisticsCompanies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    phone: '',
    companyAddress: '',
    latitude: '',
    longitude: ''
  })
  const [createdCompany, setCreatedCompany] = useState(null)

  const user = useSelector((state) => state.auth)
  const createCompany = useCreateLogisticsCompany()
  const resendCredentials = useResendLogisticsCredentials()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await createCompany.mutateAsync(formData)
      toast.success('Logistics company created successfully')
      setCreatedCompany(result.data)
      setFormData({
        companyName: '',
        companyEmail: '',
        phone: '',
        companyAddress: '',
        latitude: '',
        longitude: ''
      })
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create company')
    }
  }

  return (
    <div className='flex flex-col gap-3 p-5'>
      <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
        Welcome {user?.user?.name}
      </h3>

      <div className='bg-white rounded-md p-5 shadow-sm'>
        <h4 className='text-xl font-bold text-gray-700 mb-4'>Create Logistics Company</h4>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Company Name
              </label>
              <input
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Company Email
              </label>
              <input
                type='email'
                name='companyEmail'
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Company Address
              </label>
              <input
                type='text'
                name='companyAddress'
                value={formData.companyAddress}
                onChange={handleInputChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Latitude
              </label>
              <input
                type='number'
                step='any'
                name='latitude'
                value={formData.latitude}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Longitude
              </label>
              <input
                type='number'
                step='any'
                name='longitude'
                value={formData.longitude}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
          </div>
          <button
            type='submit'
            disabled={createCompany.isPending}
            className='mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400'
          >
            {createCompany.isPending ? 'Creating...' : 'Create Company'}
          </button>
        </form>

        {createdCompany && (
          <div className='mt-6 bg-green-50 border border-green-200 rounded-md p-4'>
            <h5 className='font-bold text-green-800'>Company Created Successfully!</h5>
            <p className='text-green-700 mt-2'>
              <strong>ID:</strong> {createdCompany._id}
            </p>
            <p className='text-green-700'>
              <strong>Email:</strong> {createdCompany.companyEmail}
            </p>
            <p className='text-green-700'>
              <strong>Phone:</strong> {createdCompany.phone}
            </p>
            <p className='text-sm text-green-600 mt-2'>
              Temporary password has been sent to the email and phone number.
            </p>
            <div className='mt-3 flex gap-2'>
              <button
                onClick={async () => {
                  try {
                    await resendCredentials.mutateAsync(createdCompany._id)
                    toast.success('Credentials resent successfully')
                  } catch (error) {
                    toast.error('Failed to resend credentials')
                  }
                }}
                disabled={resendCredentials.isPending}
                className='py-1 px-3 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400'
              >
                {resendCredentials.isPending ? 'Resending...' : 'Resend Credentials'}
              </button>
              <button
                onClick={() => setCreatedCompany(null)}
                className='py-1 px-3 bg-green-600 text-white rounded text-sm'
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogisticsCompanies