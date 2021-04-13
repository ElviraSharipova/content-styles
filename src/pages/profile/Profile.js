import React, { useEffect } from 'react'
import { Grid, Box, TextField } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useParams } from 'react-router'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles'

import {
    PersonOutline as PersonOutlineIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons'
import uuid from 'uuid/v4'

import Widget from '../../components/Widget'
import { Typography, Button } from '../../components/Wrappers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
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
     const ref_token = localStorage.getItem("token_ref");
     axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
       const token = res.data.access;
       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
     });
   
     //axios.get("/profiles/"+user_id).then(res => { data_email= res.data.email; data_phone =  res.data.phone_num; console.log(data_email, data_phone) }).catch(err => console.error(err));
    


    const classes = useStyles()
    const [tab, setTab] = React.useState(0)
    const [password, setPassword] = React.useState({
      newPassword: '',
      confirmPassword: '',
      currentPassword: '',
    });
    const [data, setData] = React.useState(null)
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
      const user_id = localStorage.getItem("user");
      console.log(data.email, data.phone, "test");
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.patch("/profiles/" + user_id + "/", { nickname: data.nickname }).then(res => { console.log(res.data); localStorage.setItem("nickname", data.nickname) }).catch(err => console.error(err));
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
                <Widget>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            value={tab}
                            onChange={handleChangeTab}
                            aria-label="full width tabs example"
                        >
                            <Tab
                                label="Профиль"
                                icon={<PersonOutlineIcon />}
                                classes={{ wrapper: classes.icon }}
                            />
                            <Tab
                                label="Сменить пароль"
                                icon={<LockIcon />}
                                classes={{ wrapper: classes.icon }}
                            />
                            <Tab
                                label="Настройки"
                                icon={<SettingsIcon />}
                                classes={{ wrapper: classes.icon }}
                            />
                        </Tabs>
                    </Box>
                </Widget>
            </Grid>
            <Grid item xs={12}>
                <Widget>
                    <Grid item justify={'center'} container>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={600}
                        >
                            { tab === 0 ? (
                                <>
                                    <Typography
                                        variant={'h5'}
                                        weight={'medium'}
                                        style={{ marginBottom: 24 }}
                                    >
                                        Личные данные
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
                    {/*<Typography weight={'medium'}>
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
                                </>
                            ) : tab === 1 ? (
                                <>
                                    <Typography
                                        variant={'h5'}
                                        weight={'medium'}
                                        style={{ marginBottom: 35 }}
                                    >
                                        Пароль
                                    </Typography>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        defaultValue={'Current Password'}
                                        value={password.currentPassword || ''}
                                        name="currentPassword"
                                        onChange={handleChangePassword}
                                        helperText={'Забыли пароль?'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        defaultValue={'New Password'}
                                        value={password.newPassword || ''}
                                        name="newPassword"
                                        onChange={handleChangePassword}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        defaultValue={'Verify Password'}
                                        value={password.confirmPassword || ''}
                                        name="confirmPassword"
                                        onChange={handleChangePassword}
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant={'h5'}
                                        weight={'medium'}
                                        style={{ marginBottom: 35 }}
                                    >
                                        Настройки
                                    </Typography>
                                    <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={10}
                                        >
                                            <MenuItem value={10}>
                                                Язык - Русский
                                            </MenuItem>
                                            <MenuItem value={20}>
                                            </MenuItem>
                                            <MenuItem value={30}>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box display={"flex"} mt={2} alignItems={"center"}>
                                        <Typography weight={"medium"}>
                                            Уведомления по email
                                        </Typography>
                                        <Switch color={"primary"} checked />
                                    </Box>
                                </>
                            )}
                              <Box
                                  display={'flex'}
                                  justifyContent={'space-between'}
                              >
                                  <>
                                  <Button variant={'outlined'} color={'primary'}>
                                      Сбросить
                                  </Button>
                                  <Button variant={'contained'} color={'success'} onClick={handleSubmit2}>
                                      Сохранить
                                  </Button>
                                  </>                                

                              </Box>                              
                             
                        </Box>
                    </Grid>
                </Widget>
            </Grid>
        </Grid>
    )
}

export default Profile
