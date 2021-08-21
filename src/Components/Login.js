import React,{useState,useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
      marginTop:theme.spacing(10),
    },
  },
}));


function Login({handleChange}) {
  const classes = useStyles();
  const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const pointerStyle={cursor:'pointer'}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {login,currentUser} =useContext(AuthContext);
    const history = useHistory();
     const handleSubmit = async(e)=>{
          console.log('hi');
        e.preventDefault()
        try {
          console.log('Logging in user')
          setLoading(true)
          await login(email, password)
          setLoading(false)
          history.push('/')
        } catch {
          setError("Failed to log in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
        }
      }
      useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (loading?  <div className={classes.root}>
      <CircularProgress />
      
    </div> :
      <Grid>
      <Paper  style={paperStyle}>
          <Grid align='center'>
               <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>Sign In</h2>
          </Grid>
          <TextField type='email' label='Email' placeholder='Enter username'  value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth required/>
          <TextField type='password' label='Password' placeholder='Enter password'  value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth required/>
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmit}>Sign in</Button>
          <Typography style={pointerStyle} > Don't have an account ?
               <Link to="/login" onClick={()=>handleChange("event",1)} >
                  Sign Up 
          </Link>
          </Typography>
      </Paper>
  </Grid>
        // <div>
        //       <form onSubmit={handleSubmit} >
        //      <div>
        //         <label htmlFor=''>Email</label>
        //             <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        //         </div>
        //         <div>
        //         <label htmlFor=''>Password</label>
        //             <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        //         </div>
        //         <button type='submit' disabled={loading}>Login</button>
        //         {error?<h1>{error}</h1>:<></>}
        //         </form>         
        // </div>
    )
}

export default Login