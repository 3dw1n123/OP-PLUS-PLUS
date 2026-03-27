export const transform = async (dataset_id, operation, params, offset = 5) => {

  const queryParams = new URLSearchParams({
    page: 1,
    offset
  })


  const res = await fetch(`http://127.0.0.1:5000/transform?${queryParams}`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      dataset_id,
      operation,
      params
    })

  });

  const project = await res.json();

  return project;

};
