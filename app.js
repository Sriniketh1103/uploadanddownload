// app.js
const baseURL = 'http://localhost:3000';

document.getElementById('fileInput').addEventListener('change', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  const fileLabel = document.getElementById('fileName');
  
  if (selectedFile) {
    fileLabel.textContent = `Selected File: ${selectedFile.name}`;
  } else {
    fileLabel.textContent = 'Choose File';
  }
 

});

async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${baseURL}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log(data);

    // Redirect to uploaded_files.html after successful upload
    window.location.href = '/uploaded_files.html';
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
