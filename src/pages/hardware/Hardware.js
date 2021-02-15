//import React from "react";
import React, { useState, useEffect, useRef } from "react";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Link
} from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors/index";
import useStyles from "./styles";

//components
import { Typography, Chip } from "../../components/Wrappers";

import img from "../../images/img1.jpg";
import img1 from "../../images/img1_1.jpg";


//products array
import { rows } from "./mock";
import axios from "axios";

const Hardware = props => {
  const typeRef = React.useRef(null);
  const brandsRef = React.useRef(null);
  const sizeRef = React.useRef(null);
  const colourRef = React.useRef(null);
  const rangeRef = React.useRef(null);
  const sortRef = React.useRef(null);

  const ws = useRef(null);
 
  const rows = [
  {
    id: 0,
    dev_sn: "test",
    stat: "оффлайн"
  },
  {
    id: 1,
    dev_sn: "Событие",
    stat: "оффлайн"
  }
];


  const [rows2, updateData2] = useState([]);

//  const rows2 = [];

  const classes = useStyles();

  
  useEffect(() => {
        ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
        ws.current.binaryType = 'arraybuffer';
        ws.current.onopen = () => {
          console.log("ws opened");

          const ref_token = localStorage.getItem("token_ref"); 
          axios.post("/token/refresh/", {"refresh":ref_token}).then(res => {
            console.log("res ", res.data); 
            const token = res.data.access; 
//}).catch(err => console.error(err));


          //const token = localStorage.getItem("token");
          console.log(token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios.get("/hardware/?owner="+localStorage.getItem("user")).then(res => { 
            //console.log("res ", res.data);
            updateData2(res.data);
            var len = res.data.length;
            let array2 = [];
            for (var i = 0; i < len; i++) {
               array2[i] = {"dev_sn":res.data[i].dev_sn, "stat":"оффлайн", "img": img};
            console.log(array2[i]);
//               rows2[i]res.data[i].dev_sn] = "offline";
            }
            updateData2(array2);
           ////array2[0] =  { "id":0, "dev_sn":"23333", "stat":"offline"};
            //console.log(array2);
            //updateData2(array2);
            //console.log(JSON.stringify(res.data));
            ws.current.send(JSON.stringify(res.data));}).catch(err => console.error(err));
}).catch(err => console.error(err));
        }
        ws.current.onclose = () => console.log("ws closed"); //devs - offline
        return () => {
            ws.current.close();
        };
    }, []);
  
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e =>  {
//          console.log(e.data);
            if(e.data != null) {
            var obj = JSON.parse(e.data);
           if(obj.online === "true" || obj.online === "false") {
           console.log(obj.device, "is online: ", obj.online);
           var len = rows2.length;
            let array3 = [];
            // console.log(array3, "pre change2");
            //ifor (var i = 0; i < len; i++) {
              // if(array3[i].dev_sn == obj.device) {
                  var isonline;
                  if(obj.online === "true") { isonline = "online"; array3[0] = {"dev_sn":obj.device, "stat":"онлайн", "img":img1}}
                  if(obj.online === "false") { isonline = "offline"; array3[0] = {"dev_sn":obj.device, "stat":"оффлайн", "img":img}}
//                  array3[0] = {"dev_sn":obj.device, "stat":isonline};
           //       array3[i] = {"dev_sn":obj.device, "stat":isonline};
                  //console.log(array3, "pre change2");
              // }
//               rows2[i]res.data[i].dev_sn] = "offline";
           // }
             //console.log(array3, "change2");
            updateData2(array3);
//           if(obj.online === "true") { rows2[obj.device] = "online";}
//           if(obj.online === "false") { rows2[obj.device] = "offline";}
  //         console.log(rows2);
        }
     }
     };
    }, []);
    
 
          //ws.current.send("hi");

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex">
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display={"flex"} flexWrap={"wrap"}>
            <Grid container item spacing={3}>
{rows2.map(c => (

  <Grid item xs={12} md={3} key={c.id}>
                  <Card className={classes.card}>
                    <CardActionArea component={Link} href={`/#`}>


                      <CardMedia
                        className={classes.media}
                        image={c.img}
                        title={c.dev_sn}
                      >
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {c.dev_sn}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text"
                          colorBrightness={"secondary"}
                          component="p"
                        >
                          {c.stat}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ padding: 16 }}>
  <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems="center"
                        width={"100%"}
                      >
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>


              ))}

            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Hardware;
