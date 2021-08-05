const getDatas = async(url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

getDatas('./fisheyedata.json').then(data => console.log(data))