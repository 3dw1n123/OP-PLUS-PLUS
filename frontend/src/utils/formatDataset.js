export const formatDataset = (dataset) => {
  // Need to know the keys 
  const keys = Object.keys(dataset)

  // Need to get the length of dataset
  const indexes = Object.keys(dataset[keys[0]])
  // "0", "1", ... "N"

  const table = indexes.map(index => {
    const row = {}
    keys.forEach(key => {
      row[key] = dataset[key][index] ? dataset[key][index] : null
    })
    return row
  })

  return table

};


