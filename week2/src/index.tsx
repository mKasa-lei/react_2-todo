import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

type InputProps={
  value:string
  setText:React.Dispatch<React.SetStateAction<string>>
  concatList:(i:string)=>void

}
const Input:React.FC<InputProps> = (props) => {
  return (
    <div>
      <input type="text" onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            props.setText(event.target.value)
      }
      } />
      <button onClick={()=>props.concatList(props.value)}>Add</button>
    </div>
  )
}

type PaginationProps={
  listCopy:Array<string>;
  CurrentIndex:number
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>
  paginationLength:number[]
  setPaginationLength:React.Dispatch<React.SetStateAction<number[]>>
  lastNumber:number
  setLastNumber:React.Dispatch<React.SetStateAction<number>>
}

const Pagination:React.FC<PaginationProps> = (props) => {
  const amountPage=props.listCopy.length / 3;
  const paginationCopy=props.paginationLength.concat([props.lastNumber]);
  const ClickFirst=()=>{
    props.setCurrentIndex(1)
  }
  const ClickLast=()=>{
    props.setCurrentIndex(Math.floor(amountPage))
  }
  const ClickPrevious=()=>{
    if (props.CurrentIndex===1){
      return;
    }
    props.setCurrentIndex(props.CurrentIndex-1)
    console.log(props.CurrentIndex)
  }
  const ClickNext=()=>{    
    if (props.CurrentIndex>(Math.floor(amountPage))){
      return;
    }
    if(props.listCopy.length / 3 > props.lastNumber){
      props.setLastNumber(props.lastNumber+1);
      props.setPaginationLength(paginationCopy);
      console.log(paginationCopy);
    }
    props.setCurrentIndex(props.CurrentIndex+1);
  }
  const PaginationClick=(i:number)=>{
    if (props.CurrentIndex>(Math.floor(amountPage))){
      return;
    }
    if(i>=3 && i<=8){
      console.log('aaa');
      props.setPaginationLength([i-2,i-1,i,i+1,i+2]);
    }else if(i===2){
      props.setPaginationLength([1,2,3,4,5]);
    }
    props.setCurrentIndex(i)
    console.log(props.CurrentIndex)
  };

  const rendPagination=
  props.paginationLength.map((value,index)=>(
    <li key={index} className="Pagination">
      <a className={value===props.CurrentIndex ? 'chosen':'unchosen'} href='#' onClick={()=>{PaginationClick(value)}}>
        {value}
      </a>
    </li>
      
  ))

  return(
    <div>
      <a href='#' onClick={()=>ClickFirst()}>first</a>
      <a href="#" onClick={()=>ClickPrevious()}>
        ＜
      </a>
      {rendPagination}
      <a href="#" onClick={()=>ClickNext()}>
        ＞
      </a>
      <a href='#' onClick={()=>ClickLast()}>last</a>
    </div>
  )
}

type ToDoListProps={
  text:string;
  list:Array<string>;
  CurrentIndex:number
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>
  paginationLength:number[]
  setPaginationLength:React.Dispatch<React.SetStateAction<number[]>>
  lastNumber:number
  setLastNumber:React.Dispatch<React.SetStateAction<number>>
  setText:React.Dispatch<React.SetStateAction<string>>
  changeTag:number;
  setChangeTag:React.Dispatch<React.SetStateAction<number>>
  setList:React.Dispatch<React.SetStateAction<Array<string>>>;
  editList:()=>JSX.Element
  deleteList:(i:number,index:string)=>void;
}

const TodoList:React.FC<ToDoListProps> = (props) => {
  const CurrentIndex=props.CurrentIndex
  const setCurrentIndex=props.setCurrentIndex
  const paginationLength=props.paginationLength
  const setPaginationLength=props.setPaginationLength
  const lastNumber=props.lastNumber
  const setLastNumber=props.setLastNumber

  const nowData = new Date();

  const Y = nowData.getFullYear()
  const M = ("00" + (nowData.getMonth()+1)).slice(-2)
  const D = ("00" + nowData.getDate()).slice(-2)
  const h = ("00" + nowData.getHours()).slice(-2)
  const m = ("00" + nowData.getMinutes()).slice(-2)
  const s = ("00" + nowData.getSeconds()).slice(-2)

  const keyPress = (event: React.KeyboardEvent) => {
    const EnterKeyCode=13;
    if (event.keyCode === EnterKeyCode){
      props.setChangeTag(-1)
    }
  }
  const listCopy=props.list;

  const limitedList=([1,2,3])

  const listMap=props.list.map((value,index)=>(
      props.changeTag !==index ? (
      <li key={index}>
        {value}
        {Y+"/"+M+"/"+D+" "+h+":"+m+":"+s}
        <a href="#" onClick={()=>props.setChangeTag(index)}>編集</a>
        <a href="#" onClick={()=>props.deleteList(index,value)}>消去</a>
      </li>
      ):(
      <input
      onKeyDown={keyPress}
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          listCopy[index] = event.target.value ;
          props.setList(listCopy)
        }
      }
      />
      )
  ))
    return (
      <div>
        <ul>{listMap}</ul>
        <Pagination
        listCopy={listCopy} 
        CurrentIndex={CurrentIndex}
        setCurrentIndex={setCurrentIndex}
        paginationLength={paginationLength}
        setPaginationLength={setPaginationLength}
        lastNumber={lastNumber}
        setLastNumber={setLastNumber}
        />
      </div>
    );
}

const Todo = () => { 
  const [text,setText]=useState<string>("")
  const [list,setList]=useState<Array<string>>([]);
  const [changeTag,setChangeTag]=useState<number>(-1)
  const [CurrentIndex,setCurrentIndex]=useState(0)
  const [paginationLength,setPaginationLength]=useState<Array<number>>([1,2,3,4,5]);
  const [lastNumber,setLastNumber]=useState(paginationLength.slice(-1)[0]);
  const [CurrentPage,setCurrentPage]=useState(1)
  const concatList=()=>setList(list.concat(text))
  const deleteList=(i:number,index:string)=>setList(list.filter(i=>i!==index))
  const editList=()=>
  {return (
  <input type="text" onChange={
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
    }
    } />
  )}

  
    return(
        <React.Fragment>
            <Input
            value={text}
            setText={setText}
            concatList={concatList}
            />
            
            <TodoList
            text={text}
            list={list}
            setText={setText}
            setList={setList}
            CurrentIndex={CurrentIndex}
            setCurrentIndex={setCurrentIndex}
            paginationLength={paginationLength}
            setPaginationLength={setPaginationLength}
            lastNumber={lastNumber}
            setLastNumber={setLastNumber}
            deleteList={deleteList}
            changeTag={changeTag}
            setChangeTag={setChangeTag}
            editList={editList}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<Todo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
