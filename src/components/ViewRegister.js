import React, {Component} from 'react';
import * as _ from "lodash";
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css';
import '../css/ASTVisualizer.css'
import VectorRegister from "../ASMComponents/VectorRegister";



function extractregisters(props){
    var instructions = props.asm[0].body;
    var instructionslen = instructions.length;
    var registersset = new Set();
    for(var i = 0; i < instructionslen; i++) {
        var ins = instructions[i];
        for(var r of ins.params) {
            registersset.add(r);
        }
    }
    return registersset;

}
function registerFromParam(params){
    var Reg=[];
    for(var i=0; i<params.length; i++){
        if(params[i][0]=="x"||params[i][0]=="y"||params[i][0]=="z"){
            Reg.push(params[i])
        }
    }
    return Reg
}
function extractRegistersAndInst(props){
    var registersAndInst=[];
    for(var i=0; i<props.asm[0].body.length; i++){
        let register=registerFromParam(props.asm[0].body[i].params);
        for(var j=0; j<register.length; j++){console.log("avant", register) ; 
            var regOb={register:null, instructions:[]};
            if (registersAndInst.filter(obj=>obj.register==register[j]).length==0){
                regOb.register=register[j]; console.log("apres", register) ;             
                regOb.instructions.push(props.asm[0].body[i].name);
                registersAndInst.push(regOb)
            }
            else{
                for(var k=0; k<registersAndInst.length; k++){
                    if(registersAndInst[k].register==register[j] && registersAndInst[k].instructions.indexOf(props.asm[0].body[i].name)==-1){
                        registersAndInst[k].instructions.push(props.asm[0].body[i].name);
                        break; //because they are not duplicated element
                    }
                }
            } 
        }
    }
    return registersAndInst.sort((a,b)=>a.register>b.register)
}
class ViewRegister extends Component {
    constructor(props) {console.log(props, "props");
        super(props);
/*
        var instructions = this.props.asm[0].body;
        var instructionslen = instructions.length;
        var registersset = new Set();
        for(var i = 0; i < instructionslen; i++) {
            var ins = instructions[i];
            console.log(ins.params);
            for(var r of ins.params) {
                registersset.add(r);
            }
        }
        
        for(var r of registersset) {
            console.log(r);
        }

        console.log(this.props.asm[0].body[0], "dans le state")
        this.state = {
            registers: registersset
        };
*/
this.state = {
    registers: extractRegistersAndInst(props)
};

    }

    componentDidMount() {
      //  this.setState({treeData: this.buildTree(this.props.ast)})
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({treeData: this.buildTree(nextProps.ast)})
    }
/*
    recursiveBuilder = (node) => {
        let children = getChildren(node);
        let tree = [];
        if (children === [])
            return children;
        children.forEach((child) => {
            tree.push({
                title: getLabel(child),
                children: this.recursiveBuilder(child),
                expanded: true,
                type: child.type,
                start: child.start,
                end: child.end
            });
        });
        return tree
    };

    buildTree = (ast) => {
        let tree = [];
        tree.push({
            title: getLabel(ast),
            children: this.recursiveBuilder(ast),
            expanded: true,
            type: ast.type,
            start: ast.start,
            end: ast.end
        });
        return tree
    };

    highlightCode = (start, end) => {
        let codeEditor = this.props.cm.current.editor.doc;
        const fromIndex = codeEditor.posFromIndex(start);
        const toIndex = codeEditor.posFromIndex(end);
        codeEditor.markText(fromIndex, toIndex, {
            className: 'highlighted-code'
        });
    };

    clearHighlightedCode = () => {
        this.props.cm.current.editor.doc.getAllMarks().forEach((m) => {
            m.clear()
        })
    };
*/

    render() {console.log( "dans render",this.state.registers )
        /*return (
            <div>`test {this.state.registers}` </div>
            
        );*/
        return (
            <div>
                <VectorRegister title= {this.state.registers.length} registers  body={this.state.registers}/>
                
            </div>
            );
    }
}
export default ViewRegister;