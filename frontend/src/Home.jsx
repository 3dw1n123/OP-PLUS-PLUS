import { useNavigate } from "react-router";
import "./App.css";

function Home() {

  const navigate = useNavigate()

  // Send upload file request to the API
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const url = "http://localhost:5000/upload"

    const formData = new FormData(ev.target);

    const res = await fetch(url, {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    console.log(data)
    navigate(`/project/${data.id}`)

  }

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <form onSubmit={onSubmit}>
        <input name="file" type="file" />
        <button type="submit">Upload</button>
      </form>

    </>
  );
}

export default Home;
