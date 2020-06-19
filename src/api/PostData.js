export function PostData(type, userData) {
    let BaseURL = 'https://pacwil.000webhostapp.com/react_api/login.php';
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL+type, {
   method: 'POST',
   body: JSON.stringify(userData)
   })
   .then((response) => response.json())
   .then((res) => {
    resolve(res);
   })
   .catch((error) => {
    reject(error);
   });
   });
   }