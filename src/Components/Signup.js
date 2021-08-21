import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from '../firebase';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

function Signup() {
    const paperStyle = { padding: 20,height:'60vh', width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const [file,setFile] = useState(null)
    const {signup,currentUser} =useContext(AuthContext);
    const handleSignup =async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        let res = await signup(email,password);
        let uid = res.user.uid;
        console.log(uid); 
        const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
        // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        // fn 1 -> progress tracking
        // fn2 -> error
        // fn3 -> success
        uploadTaskListener.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
        }
        async function fn3(){
            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            console.log(downloadUrl);
          await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[]
            })
            setLoading(false);
            console.log('User has Signed up');
            history.push('/')
        }
    
      
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (
        <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>
            <form>
                <TextField fullWidth label='Name' placeholder="Enter your name" type='text' value={name} onChange={(e)=>setName(e.target.value)} required/>
                <TextField fullWidth label='Email' placeholder="Enter your email" type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <TextField fullWidth label='Password' placeholder="Enter your password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <div style={marginTop}>
                     <label htmlFor='profile'>Profile image</label>
                    <input type='file' accept='image/*' onChange={handleFileSubmit} required />
                   </div>
                <Button style={marginTop} type='submit' variant='contained' color='primary' disabled={loading} onClick={handleSignup}>Sign up</Button>
            </form>
        </Paper>
    </Grid>
        // <div>
        //     <form onSubmit={handleSignup} >
        //         <div>
        //             <label htmlFor=''>UserName</label>
        //             <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

        //         </div>
        //         <div>
        //         <label htmlFor=''>Email</label>
        //             <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        //         </div>
        //         <div>
        //         <label htmlFor=''>Password</label>
        //             <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        //         </div>
        //         <div>
        //             <label htmlFor='profile'>Profile image</label>
        //             <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
        //         </div>
        //         <button type='submit' disabled={loading}>SignUp</button>
        //     </form>
        // </div>
    )
}

export default Signup