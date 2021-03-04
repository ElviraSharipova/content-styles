import React from "react";
import { MChap } from "./typography_short";
import Test from "./Test.js";
import { tests13 } from "./tests";

const Mod1_3_test= () => (
  <>
    <MChap>1.3.2. Тест.</MChap>
    <Test tests={tests13} />
  </>
)

export default Mod1_3_test
