import react , {useState, useEffect} from 'react';
import axios from 'axios';
const Register = ()=> {
    const [user, setUser] = useState({name: '', password: '', address: ''});
    const [file,setFile] = useState(null);
    const [error , setError] = useState(null);
    const [message, setMessage] = useState(null)
    const handleChange = (e)=> {
        const {name, value} = e.target
        setUser({...user, [name]: value});
        console.log(user)
     
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(file)
    }

    const handleSubmit = (e)=> {
        console.log("hell owor")
        e.preventDefault();
        const {name, password, address} = user
        if(!name || !password || !address) {
            return setError("Please fill up all the field")
        }else if(password.length <= 4) {
            return setError("Password must be more than 4 charactors long")
        }else if(file === null) {
            return setError("Image required")
        }
        const formdata = new FormData()
        
        formdata.append("name", user.name);
        formdata.append("password", user.password);
        formdata.append("address",user.address)
        formdata.append("image",file);
        axios.post("http://localhost:4000/user/register",formdata,
        {headers: {"Content-Type" : 'multipart/form-data'}})
        .then(res=> {
            console.log("hello world")
            console.log(res.data)
            setMessage("Uploaded successfully")
        })
        .catch(err=> {
            console.log(err)
        })
    }
    return (
        <div className='container'>
        <div className='card p-3 col-md-4 ms-4 mt-5'>
            <div className='text-center h3'>Register</div>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{message}</p>
            <form action='/formuser' method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name='name' className='form-control' onChange={handleChange}/>
                <label>Password</label>
                <input type="text" name='password' className='form-control'onChange={handleChange}/>
                <label>Address</label>
                <input type="text" name='address' className='form-control' onChange={handleChange}/>
                <label>Image</label>
                <input type="file" name='image' className='form-control' onChange={handleFileChange}/>
                <button type='submit' className='btn btn-outline-info mt-2'>Register</button>
            </form>
        </div>
        </div>
    )

}

export default Register;