import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useBulkUploadLogistics } from '../../hooks/logisticApi'
import { toast } from 'react-toastify'

const BulkUploadLogistics = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState(null)
  const user = useSelector((state) => state.auth)
  const bulkUploadLogistics = useBulkUploadLogistics()

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setUploadResult(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      toast.error('Please select a CSV file')
      return
    }

    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      formData.append('sample_riders.csv', selectedFile)
      
      // Use a progress indicator if the API supports it
      const result = await bulkUploadLogistics.mutateAsync(formData)
      setUploadResult(result)
      toast.success('Logistics persons uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error?.response?.data?.message || 'Failed to upload logistics persons')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 p-5'>
      <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
        Welcome {user?.user?.name}
      </h3>

      <div className='bg-white rounded-md p-5 shadow-sm'>
        <h4 className='text-xl font-bold text-gray-700 mb-4'>Bulk Upload Logistics Persons</h4>
        
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='csvFile' className='block text-sm font-medium text-gray-700 mb-2'>
              Select CSV File
            </label>
            <input
              type='file'
              id='csvFile'
              accept='.csv'
              onChange={handleFileChange}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
            />
            <p className='mt-1 text-sm text-gray-500'>
              Upload a CSV file with logistics person data
            </p>
          </div>

          {selectedFile && (
            <div className='mb-4 p-3 bg-gray-50 rounded-md'>
              <p className='text-sm font-medium text-gray-700'>Selected file:</p>
              <p className='text-sm text-gray-600'>{selectedFile.name}</p>
              <p className='text-xs text-gray-500 mt-1'>
                Size: {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            type='submit'
            disabled={!selectedFile || isUploading}
            className={`py-2 px-4 rounded-md text-white font-medium ${
              !selectedFile || isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {isUploading && (
          <div className='mt-4'>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div 
                className='bg-green-600 h-2.5 rounded-full' 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className='text-sm text-gray-500 mt-1'>Uploading... {uploadProgress}%</p>
          </div>
        )}

        {uploadResult && (
          <div className='mt-4 p-4 bg-green-50 rounded-md'>
            <h5 className='font-medium text-green-800'>Upload Result</h5>
            <p className='text-sm text-green-700 mt-1'>
              {uploadResult.message || 'Logistics persons uploaded successfully'}
            </p>
            {uploadResult.data && (
              <div className='mt-2 text-sm text-green-700'>
                <p>Total uploaded: {uploadResult.data.length}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='bg-white rounded-md p-3 md:p-5 shadow-sm mt-4'>
        <h4 className='text-lg font-bold text-gray-700 mb-3'>CSV Format</h4>
        <p className='text-sm text-gray-600 mb-3'>
          Your CSV file should include the following columns:
        </p>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 text-sm'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Column
                </th>
                <th className='px-2 md:px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Description
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  logisticsCompany
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Name of the logistics company
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  companyName
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Name of the person
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  companyEmail
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Email address
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  companyAddress
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Physical address
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  phone
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Phone number
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  password
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Account password
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  carrier
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Type of vehicle (Motorcycle, Car, Bicycle, Van, etc.)
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  latitude
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Geographic latitude coordinate
                </td>
              </tr>
              <tr>
                <td className='px-2 md:px-3 py-2 text-sm font-medium text-gray-900 break-words'>
                  longitude
                </td>
                <td className='px-2 md:px-3 py-2 text-sm text-gray-500 break-words'>
                  Geographic longitude coordinate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BulkUploadLogistics