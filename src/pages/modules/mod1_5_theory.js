import React from "react";
import { MTxt, MChap, MImg, MParg, MEq, MVid } from "./typography_short"
import Stream from "../../components/Stream";

function Mod1_5() {
  return (
    <div style={{ marginLeft: 24, marginRight: "2%" }}>
      <MChap>
        1.5. Нейротех
      </MChap>
      <Stream src="https://www.youtube.com/embed/6zQ-7foF1GE"/>
    </div>
  )
}

export default Mod1_5
