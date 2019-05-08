import React, {Component} from 'react';
import * as _ from "lodash";
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css';
import '../css/ASTVisualizer.css'

class ViewRegister extends Component {
    constructor(props) {console.log(props);
        super(props);
        this.state = {
            treeData: [],
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
    render() {
        return (
            <SortableTree
                treeData={this.state.treeData}
                onChange={treeData => this.setState({treeData})}
                canDrag={false}
                generateNodeProps={({node}) => {
                    return {
                        className: node.type,
  //                      onMouseEnter: () => this.highlightCode(node.start, node.end),
    //                    onMouseLeave: () => this.clearHighlightedCode()
                    };
                }}
            />
        );
    }
}
export default ViewRegister;