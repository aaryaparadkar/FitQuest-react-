import React, { useState } from 'react';
import axios from 'axios';

export default function XYZ () {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('input', input);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/xyz/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Image Upload Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input">Input Prompt:</label>
          <input type="text" id="input" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Choose an image:</label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

