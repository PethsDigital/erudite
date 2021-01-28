const myForm = document.querySelector(".signup-form");
window.addEventListener('load',async(e)=>{

    // All Users 
    let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVfaWQiOiIiLCJnZW5kZXIiOiJNIiwiaXNfYWRtaW4iOnRydWUsIm5vb2ZFbWFpbHMiOjAsInRvcGljcyI6W10sIl9pZCI6IjYwMDg2MzM5NjNmYWQ2MDAyNDA3NDg2OCIsIm5hbWUiOiJUb3llIiwiZW1haWwiOiJ0b3llc2VhZGVyaWJpZ2JlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidG95ZSIsInBhc3N3b3JkIjoiJDJiJDExJC8zL3o4WWRMSXE0eGJaOU1ESGs1R2VROEZMWS4ucWNYeGFzc1dTZjl1TThCTFZkSGpPYVFxIiwicGhvbmUiOiIwODEwNTAyNTkzOSIsIm90cCI6OTU0MTkwLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTIwVDE3OjA3OjA1LjUzN1oiLCJ1cGRhdGVkQXQiOiIyMDIxLTAxLTIxVDA5OjI1OjIwLjc1N1oiLCJfX3YiOjAsImlhdCI6MTYxMTIyMjkyMH0.vdp_VwSbYALfztUJniXpEjLrWDX5xHrjnK6jpVBlDdk");
  
    let userRequest = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
    await fetch("https://erudite-be.herokuapp.com/v1/users/", userRequest)
      .then(response => response.json())
      .then(result => result.data)
      .catch(error => console.log('error', error));
    })  

myForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVfaWQiOiIiLCJnZW5kZXIiOiJNIiwiaXNfYWRtaW4iOnRydWUsIm5vb2ZFbWFpbHMiOjAsInRvcGljcyI6W10sIl9pZCI6IjYwMDg2MzM5NjNmYWQ2MDAyNDA3NDg2OCIsIm5hbWUiOiJUb3llIiwiZW1haWwiOiJ0b3llc2VhZGVyaWJpZ2JlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidG95ZSIsInBhc3N3b3JkIjoiJDJiJDExJC8zL3o4WWRMSXE0eGJaOU1ESGs1R2VROEZMWS4ucWNYeGFzc1dTZjl1TThCTFZkSGpPYVFxIiwicGhvbmUiOiIwODEwNTAyNTkzOSIsIm90cCI6OTU0MTkwLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTIwVDE3OjA3OjA1LjUzN1oiLCJ1cGRhdGVkQXQiOiIyMDIxLTAxLTIxVDA5OjI1OjIwLjc1N1oiLCJfX3YiOjAsImlhdCI6MTYxMTIyMjkyMH0.vdp_VwSbYALfztUJniXpEjLrWDX5xHrjnK6jpVBlDdk");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", username);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("https://erudite-be.herokuapp.com/v1/users/login/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});
