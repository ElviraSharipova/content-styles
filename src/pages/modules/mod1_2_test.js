import React from "react";
import { MChap } from "./typography_short";
import Test from "./Test.js";
import { tests12 } from "./tests";

const Mod1_2_test = () => (
  <>
    <MChap>1.2.2. Тест.</MChap>
    <Test tests={tests12} />
  </>
)

export default Mod1_2_test
