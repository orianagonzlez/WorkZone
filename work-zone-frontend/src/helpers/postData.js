export const postData = async(path, body) => {

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`http://localhost:8000/${path}`, requestOptions);

  const result = await response.text();

  console.log(result);
  const r = JSON.parse(result);

  console.log('por alguna razon se termino')
  return r;

}

