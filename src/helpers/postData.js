export const postData = async (path, body) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(path, requestOptions);

  const result = await response.text();

  const r = JSON.parse(result);

  return r;
};
