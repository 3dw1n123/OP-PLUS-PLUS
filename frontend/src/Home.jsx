import { useNavigate } from "react-router";
import "./App.css";
import { upload } from "./api/upload";

function Home() {

  const navigate = useNavigate()

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const res = await upload(formData)

    if (res.id) {
      navigate(`/project/${res.id}`)
    }

  }

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <form onSubmit={onSubmit}>
        <input name="file" type="file" accept=".csv" />
        <button type="submit">Upload</button>
      </form>

    </>
  );
}

export default Home;
