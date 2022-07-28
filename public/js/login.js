
const enterSystem=async(login,password)=>{
  const res=await axios.post('http://localhost:4000/api/v1/users/signin',({
    data:{email:login,password:password}
  }))
}

document.querySelector('.form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const email=document.querySelector('#email').value;
  const password=document.querySelector('#password').value
  enterSystem(email,password)
  console.log(email,password)
})