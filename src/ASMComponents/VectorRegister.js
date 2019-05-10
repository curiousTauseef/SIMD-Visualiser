import React, {Component} from "react";
import * as _ from "lodash";
import "../css/VectorRegister.css";
import {convertToStrings} from "../Utils/Converter";

 function VectorRegister(props) {
var k=1;
   return(
       <div className="registerUsed">
           <h1>There are {props.body.length} registers used </h1>
           {props.body.map(o=><div key={o.register+"div"}><button key={o.register}><h2>{o.register}</h2> {o.instructions.map(i=><h5 className={o.register+i} key={o.register+i}>{i}</h5>)}</button></div>)}
           <div>{props.instructions.map(o=><p key={o.id+"ins"}>step {o.id} the intrinsic {o.instruction} uses the following register {o.registers.map(r=><span key={r+o.id+k++}>{r}<br/></span>)}</p>)}</div>
       </div>
   )
}

export default VectorRegister;
