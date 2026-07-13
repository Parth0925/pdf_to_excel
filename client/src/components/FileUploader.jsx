import { useState } from "react";
import { uploadPDF } from "../services/api";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);

      const response = await uploadPDF(formData);

      // Download Excel automatically
      const downloadLink = document.createElement("a");
      // downloadLink.href = "http://localhost:8000" + response.data.downloadUrl;
      downloadLink.href =
        import.meta.env.VITE_API_URL + response.data.downloadUrl;
      downloadLink.download = "";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      alert("Conversion successful.");
    } catch (error) {
      console.log(error);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload Bank Statement</h2>

      <label className="file-upload">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <span>{file ? file.name : "📄 Choose PDF File"}</span>
      </label>

      {file && (
        <p className="selected-file">
          Selected: <strong>{file.name}</strong>
        </p>
      )}

      <button className="upload-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Convert to Excel"}
      </button>
    </div>
  );
}

export default FileUploader;
