export const getData = async(path) => {
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    const response = await fetch(`http://localhost:8000/${path}`, requestOptions);

    const result = await response.text();

    console.log(result);
    const r = JSON.parse(result);

    console.log('por alguna razon se termino')
    return r;

}
