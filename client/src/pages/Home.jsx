import FileUploader from "../components/FileUploader";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero-card">
        <span className="badge">PDF → Excel</span>

        <h1>PDF To Excel Converter</h1>

        <p>
          Upload your bank statement PDF and convert it into an Excel file in
          seconds.
        </p>

        <FileUploader />
      </div>
    </div>
  );
}

export default Home;
