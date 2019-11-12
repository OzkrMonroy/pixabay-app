import React from 'react';

const Error = ({message}) => ( 
  <p className="my-3 p-4 text-center alert alert-danger text-white">
    {message}
  </p>
)
 
export default Error;