import react , {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'

const EditUser = ()=> {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null)
    useEffect(()=> {
        axios.get(`http://localhost:4000/user/${id}`)
        .then(res=> {
            setUser(res.data)
            setFile(res.data.image)
            console.log(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    },[])

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(user)
        console.log(file)
        const {name, password, address} = user

        if(!name || !password || !address) {
            return setError("Please fill up all the field")
        }else if(password.length <= 4) {
            return setError("Password must be more than 4 charactors long")
        }else if(file === null) {
            return setError("please choose file")
        }
        const formdata = new FormData()
        formdata.append("name", user.name);
        formdata.append("address",user.address)
        formdata.append("image",file);
        axios.put(`http://localhost:4000/user/${id}`,formdata,
        {headers: {"Content-Type" : 'multipart/form-data'}})
        .then(res=> {
            if(res.data.modifiedCount === 1) 
            return setMessage("Updated successfully")
        })
        .catch(err=> {
            console.log(err)
        })
    }
    return(
        <div className='container'>
        <div className='col-md-4 ms-4 mt-4'>
            
            <div className='text-center h3'>Register</div>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{message}</p>
            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name='name' className='form-control'
                 value={user.name ? user.name : ''}
                 onChange={(e)=> {setUser({...user, name: e.target.value})}}/>
                <label>Address</label>
                <input type="text" name='address' className='form-control' 
                value={user.address ? user.address : ''}
                onChange={(e)=> {setUser({...user, address: e.target.value})}}/>
                <label>Image</label>
                <input type="file" name='image' className='form-control'
                 onChange={(e)=> {setFile(e.target.files[0])}}/>
                 <button type='submit' className='btn btn-outline-primary mt-2'>Update User</button>
            </form>
        </div>
        </div>
    )
}

export default EditUser;