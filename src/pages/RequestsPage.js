import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRequestStatus, fetchRequests } from '../features/requestSlice';
import { markBookAsSold } from '../features/bookSlice';

const RequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchRequests(user.uid));
    }
  }, [dispatch, user]);

  const handleRequest = (type, request) => {
    if(type === 'complete') {
      dispatch(markBookAsSold(request.bookDetails.bookId));
    }

    const requestStatus = {
      id: request.id,
      status: type
    }
    dispatch(changeRequestStatus(requestStatus));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Book Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {requests.map((request) => (
          <div key={request.id} className="flex flex-col p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{request?.bookDetails?.subject}</h2>
            <p className='mt-5'>Requested by: {request.name}</p>
            <a href={`mailto:${request.email}`} className='mt-3'>Email: <span className='text-indigo-600'>{request.email}</span></a>
            <a href={`tel:${request.email}`} className='my-3'>Phone: <span className='text-indigo-600'>{request.phoneNo}</span></a>
            {request.status === 'pending' && <div className='flex justify-end'>
              <button
                className="mx-5 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => handleRequest('cancel', request)}
              >
                Cancel Request
              </button>
              <button
                className="mt-10 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => handleRequest('complete', request)}
              >
                Complete Request
              </button>
            </div>}
            {request.status === 'cancel' && <p className='mt-5 text-red-300'>The request was cancelled</p>}
            {request.status === 'complete' && <p className='mt-5 text-green-700'>The request was completed</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
