import React, { useEffect } from 'react'
import { Grid, Box, TextField, IconButton } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useParams } from 'react-router'
import Checkbox from '@mui/material/Checkbox'
import Switch from '@mui/material/Switch'
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles'

import {
    PersonOutline as PersonOutlineIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material'
import uuid from 'uuid/v4'

import Widget from '../../components/Widget'
import { Typography, Button } from '../../components/Wrappers'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify'

import Notification from '../../components/Notification'
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext'
import config from '../../config'
import Axios from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie';

import { actions } from '../../context/ManagementContext'

const Profile = () => {
    

//     const user_id = localStorage.getItem("user");
  let data_email = localStorage.getItem("email");
  let data_phone = localStorage.getItem("phone");
  let data_nickname = localStorage.getItem("nickname");
   
  //axios.get("/profiles/"+user_id).then(res => { data_email= res.data.email; data_phone =  res.data.phone_num; console.log(data_email, data_phone) }).catch(err => console.error(err));
    


  const classes = useStyles()
  const [tab, setTab] = React.useState(0)
  const [password, setPassword] = React.useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState(null)
  const [helperText, setHelperText] = React.useState("")
  const [editable, setEditable] = React.useState(false)
  let { id } = useParams();
  const fileInput = React.useRef(null);
  const handleChangeTab = (event, newValue) => {
      setTab(newValue)
  }
  const location = useLocation();
  const managementDispatch = useManagementDispatch()
  const managementValue = useManagementState()

  function extractExtensionFrom(filename) {
    if (!filename) {
      return null;
    }
    
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)[1];
  }

  const uploadToServer = async (file, path, filename) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    const uri = `${config.baseURLApi}/file/upload/${path}`;
    await Axios.post(uri, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  
    const privateUrl = `${path}/${filename}`;
  
    return `${config.baseURLApi}/file/download?privateUrl=${privateUrl}`;
  }

  const handleFile = async (event) => {
    const file = event.target.files[0];
  
    const extension = extractExtensionFrom(file.name);
    const id = uuid();
    const filename = `${id}.${extension}`;
    const privateUrl = `users/avatar/${filename}`;
  
    const publicUrl = await uploadToServer(
      file,
      'users/avatar',
      filename,
    );
    let avatarObj = {
      id: id,
      name: file.name,
      sizeInBytes: file.size,
      privateUrl,
      publicUrl,
      new: true
    }

    setData({
      ...data,
      avatar: [...data.avatar, avatarObj]
    })

    return null;
  }
  const history = useHistory();
  function sendNotification() {
    const componentProps = {
      type: "feedback",
      message: "User edited!",
      variant: "contained",
      color: "success"
    };
    const options = {
      type: "info",
      position: toast.POSITION.TOP_RIGHT,
      progressClassName: classes.progress,
      className: classes.notification,
      timeOut: 1000
    };
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options
    );
  }
  useEffect(() => {
    if (id !== 'edit') {
      actions.doFind(id)(managementDispatch)
    } else {
      actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch)
    }
  }, []);

  useEffect(() => {
      
    if (location.pathname.includes('edit')) {
      setEditable(true);
    }
  }, [location.pathname]);


  useEffect(() => {
      setData(managementValue.currentUser)
  }, [managementDispatch, managementValue, id])

  const deleteOneImage = (id) => {
    setData({
      ...data,
      avatar: data.avatar.filter(avatar => avatar.id !== id)
    })
  }

  function handleSubmit() {
    if (id === 'edit') {
      actions.doUpdate(sessionStorage.getItem('user_id'), data, history)(managementDispatch)
    } else {
      actions.doUpdate(id, data, history)(managementDispatch)        
    }
    sendNotification()
  }


  function handleSubmit2() {
    //const user_id = localStorage.getItem("user");
    if (password.currentPassword && password.newPassword && password.newPassword == password.confirmPassword) {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        //axios.patch("/profiles/" + user_id + "/", { nickname: data.nickname }).then(res => {
        //  console.log(res.data); localStorage.setItem("nickname", data.nickname)
        axios.patch("/profiles/password/", {
          current_password: password.currentPassword,
          new_password: password.newPassword
        }).catch(err => console.error(err));
        //}).catch(err => console.error(err));
      });
      setHelperText("Сохранено")
    } else {
      setHelperText("Пароли не совпадают")
    }
  }


  function handleUpdatePassword() {
    actions.doChangePassword(password)(managementDispatch)
  }

  function handleChangePassword(e) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })
  }
  function handleClickShowPassword(e) {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(e) {
      console.log(data)
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }

    return (
      <Grid container spacing={3}>
          <Grid item xs={12}>
              <Grid item justifyContent={'center'} container>
                  <Box
                      display={'flex'}
                      flexDirection={'column'}
                      width={600}
                  >
                          <>
                              {/*<Typography
                                  variant={'h5'}
                                  weight={'medium'}
                                  style={{ marginBottom: 24, alignSelf: "center"  }}
                              >
                                  Редактировать профиль
                              </Typography>
                              <Typography
                                  weight={'medium'}
                                  style={{ marginBottom: 12 }}
                              >
                                  Имя пользователя
                              </Typography>
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  type={'nickname'}
                                  defaultValue={data_nickname}
                                  value={data && data.nickname}
                                  name="nickname"
                                  onChange={handleChange}
                              />
                              <Typography weight={'medium'}>
                                  Аватар:
                              </Typography>
                              <div class={classes.galleryWrap}>
                              {data && data.avatar && data.avatar.length !== 0 ? (
                                data.avatar.map((avatar, idx) => (
                                  <div className={classes.imgWrap}>
                                    <span className={classes.deleteImageX} onClick={() => deleteOneImage(avatar.id)}>×</span>
                                    <img
                                        src={avatar.publicUrl}
                                        alt="photo"
                                        height={'100%'}
                                    />                                          
                                  </div>
                                ))
                              ): null}
                              </div>
                              <label
                                className={classes.uploadLabel}
                                style={{ cursor: 'pointer' }}
                              >
                                {'Загрузить фото'}
                                  <input style={{ display: 'none' }} accept="image/*" type="file" ref={fileInput} onChange={handleFile} />
                              </label>

                              <Typography
                                  size={'sm'}
                                  style={{ marginBottom: 35 }}
                              >
                                  .PNG, .JPG, .JPEG
                              </Typography>
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  defaultValue={data_phone}
                                  value={data && data.phone}
                                  name="phone"
                                  onChange={handleChange}
                              />
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  type={'email'}
                                  defaultValue={data_email}
                                  value={data && data.email}
                                  name="email"
                                  onChange={handleChange}
                              />*/}
                              <Typography
                                  variant={'h5'}
                                  weight={'medium'}
                                  style={{ marginBottom: 24, alignSelf: "center" }}
                              >
                                  Изменить пароль
                              </Typography>
                              <Typography
                                  weight={'medium'}
                                  style={{ marginBottom: 12 }}
                              >
                                  Текущий пароль
                              </Typography>
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  defaultValue={'Current Password'}
                                  value={password.currentPassword || ''}
                                  name="currentPassword"
                                  onChange={handleChangePassword}
                                  type={showPassword ? "text" : "password"}
                                  InputProps={{ endAdornment:
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(event) => handleClickShowPassword(event)}
                                        onMouseDown={handleMouseDownPassword}
                                        size="large">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }}
                              />
                              <Typography
                                  weight={'medium'}
                                  style={{ marginBottom: 12 }}
                              >
                                  Новый пароль
                              </Typography>
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  defaultValue={'New Password'}
                                  value={password.newPassword || ''}
                                  name="newPassword"
                                  onChange={handleChangePassword}
                                  type="password"
                              />
                              <Typography
                                  weight={'medium'}
                                  style={{ marginBottom: 12 }}
                              >
                                  Повторите пароль
                              </Typography>
                              <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  style={{ marginBottom: 35 }}
                                  defaultValue={'Verify Password'}
                                  value={password.confirmPassword || ''}
                                  name="confirmPassword"
                                  onChange={handleChangePassword}
                                  type="password"
                              />
                          </>
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                        >
                            <Button variant={'contained'} color={'success'} onClick={handleSubmit2}>
                                Сохранить
                            </Button>
                            <Typography
                                variant={'body1'}
                                weight={'medium'}
                            >
                              {helperText}
                            </Typography>
                        </Box>                              
                           
                  </Box>
              </Grid>
          </Grid>
      </Grid>
    );
}

export default Profile
