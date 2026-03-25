export const upload = async (formData) => {
  const url = "http://localhost:5000/upload"

  const res = await fetch(url, {
    method: "POST",
    body: formData
  })

  const data = await res.json()

  return data
}


