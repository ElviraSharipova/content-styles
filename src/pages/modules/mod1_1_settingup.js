import React from "react";
import { MTxt, MChap, MImg, MParg, MEq, MRadio, MVid, MNav } from "./typography_short";
import { Grid } from "@material-ui/core";
import img1 from "../../images/modules/1_1_pic1.PNG";
import img2 from "../../images/modules/1_1_pic2.PNG";
import img3 from "../../images/modules/1_1_pic3.PNG";
import img4 from "../../images/modules/1_1_pic4.PNG";
import img5 from "../../images/modules/1_1_pic5.PNG";
import img6 from "../../images/modules/1_1_pic6.PNG";
import img7 from "../../images/modules/1_1_pic7.PNG";
import img8 from "../../images/modules/1_1_pic8.PNG";

const Mod= () => (
  <div style={{ marginLeft: 24, marginRight: "4%" }}>
    <MChap>
      1.1.1. Подключение стенда к платформе Эквиум.
    </MChap>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MParg>
          Первое включение
        </MParg>
        <MTxt>
          <p>1.	Включите стенд, при этом на нем должны загореться светодиоды</p>
          <p>2.	Подключитесь с Вашего ноутбука к Wi-Fi-сети 0xBEE. Пароль для сети "q1w2e3r4". Возможно, появится предупреждение «Нет подключения к Интернету, защищено» – так и должно быть. </p>
          <MImg img={img1} width="30%"/>
          <p>3.	Откройте браузер и перейдите на страницу http://192.168.8.1/  Должно открыться окно с выбором желаемых действий: </p>
          <MImg img={img2}/>
        </MTxt>
        <MParg>
          Подключение к сети Интернет
        </MParg>
        <MTxt>
          <p>Необходимо обеспечить стенду выход в сеть Интернет. Для этого надо сообщить ему данные (имя и пароль) от Вашей домашней/офисной Wi-Fi сети. Чтобы это сделать, нажмите кнопку «Перейти», находящуюся в поле «Подключение к Wi-Fi». </p>
          <p>4.	Должно открыться окно с выбором доступных Wi-Fi сетей. Выберите Вашу сеть из доступных (допустим, она называется BiTronics): </p>
          <MImg img={img3}/>
          <MImg img={img4} />
        </MTxt>
      </Grid>
      <Grid item xs={6}>
        <MTxt>
          <p>5.	Введите пароль от Вашей Wi-Fi сети. При отсутствии пароля оставьте поле пустым.  </p>
          <MImg img={img5}/>
          <p>После этого должна произойти попытка подключения:  </p>
          <MImg img={img6}/>
          <p>В случае успешного подключения появится следующее окно:  </p>
          <MImg img={img7} width="90%"/>
          <p>В случае неуспешной попытки подключения повторите шаги 4, 5 заново.  </p>
        </MTxt>
        <MParg>
          Подключение к аккаунту Эквиум.
        </MParg>
        <MTxt>
          <p>Для работы со стендом на платформе Эквиум необходимо связать его с демонстрационным аккаунтом Eqvium. </p>
          <p>6.	В верхнем меню странички нажмите кнопку «Eq registration», откроется следующее окно:  </p>
          <MImg img={img8} width="90%"/>
          <p>Введите следующие данные: </p>
          <p>Имя пользователя: den</p>
          <p>Пароль: 123 </p>
          <p>После успешного подключения стенд отобразится на платформе в разделе оборудование.  </p>
        </MTxt>
      </Grid>
    </Grid>
  </div>
)

export default Mod
