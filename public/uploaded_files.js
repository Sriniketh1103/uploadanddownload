// uploaded_files.js
const baseURL = 'http://localhost:3000';

async function fetchUploadedFiles() {
  try {
    const response = await fetch(`${baseURL}/getUploadedFiles`);
    const data = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    if (data.filenames.length > 0) {
      data.filenames.forEach((filename) => {
        const listItem = document.createElement('li');
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener('click', () => downloadFile(filename));
        listItem.textContent = filename;
        listItem.appendChild(downloadButton);
        fileList.appendChild(listItem);
      });
    } else {
      const noFilesMessage = document.createElement('li');
      noFilesMessage.textContent = 'No files uploaded yet.';
      fileList.appendChild(noFilesMessage);
    }
  } catch (error) {
    console.error('Error fetching uploaded files:', error);
  }
}

async function downloadFile(filename) {
  try {
    const response = await fetch(`${baseURL}/download/${filename}`);
    if (!response.ok) {
      throw new Error('File not found');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

// Call the function to fetch and display the uploaded files on page load
fetchUploadedFiles();
