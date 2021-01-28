let form = document.querySelector('.signup-form');


form.addEventListener('submit',(e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone-num').value;
    let password = document.getElementById('pwd').value;
    let confirmPassword = document.getElementById('confirmpwd').value;
        if (password != confirmPassword){
            alert("Your passwords are not the same")
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVfaWQiOiIiLCJnZW5kZXIiOiJNIiwiaXNfYWRtaW4iOnRydWUsIm5vb2ZFbWFpbHMiOjAsInRvcGljcyI6W10sIl9pZCI6IjYwMDg2MzM5NjNmYWQ2MDAyNDA3NDg2OCIsIm5hbWUiOiJUb3llIiwiZW1haWwiOiJ0b3llc2VhZGVyaWJpZ2JlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidG95ZSIsInBhc3N3b3JkIjoiJDJiJDExJC8zL3o4WWRMSXE0eGJaOU1ESGs1R2VROEZMWS4ucWNYeGFzc1dTZjl1TThCTFZkSGpPYVFxIiwicGhvbmUiOiIwODEwNTAyNTkzOSIsIm90cCI6OTU0MTkwLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTIwVDE3OjA3OjA1LjUzN1oiLCJ1cGRhdGVkQXQiOiIyMDIxLTAxLTIxVDA5OjI1OjIwLjc1N1oiLCJfX3YiOjAsImlhdCI6MTYxMTIyMjkyMH0.vdp_VwSbYALfztUJniXpEjLrWDX5xHrjnK6jpVBlDdk");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("email", email);
            urlencoded.append("name", name);
            urlencoded.append("gender", "undefined");
            urlencoded.append("username", username);
            urlencoded.append("phone", phone);
            urlencoded.append("password", password);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

            fetch("https://erudite-be.herokuapp.com/v1/users/register/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }

})