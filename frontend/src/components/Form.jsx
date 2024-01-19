import React, { useState } from 'react';
import axios from 'axios';

function PdfForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('address', address);
    formData.append('photo', photo);

    try {
        const response = await axios.post('http://localhost:3001/api/users', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'arraybuffer', // Use 'arraybuffer' to handle binary data
        });
  
        // Save the generated PDF
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
  
      } catch (error) {
        console.error(error);
      }
  };

  const handleDownload = () => {
    // Trigger download of the PDF
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `${name}_preview.pdf`;
    a.click();
  };

  return (
    <div>
      <h1>PDF Maker</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Age:</label>
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      <br />
      <label>Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      <br />
      <label>Photo:</label>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleSubmit}>Generate PDF</button>

      {/* PDF Preview and Download */}
      {pdfUrl && (
        <div>
          <h2>Preview:</h2>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
          <br />
          <button onClick={handleDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default PdfForm;
