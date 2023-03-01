import {useState, useRef} from 'react' ;

export default function Kanban({data}) {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragTask = useRef();
    const dragNode = useRef();

    const dragStart = (e, indexArr) =>{
        dragTask.current = indexArr;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', dragEnd)
        //changes style
        setTimeout(()=>{
            setDragging(true);
        },0)
    }

    const dragEnter = (e, indexArr) =>{
        const currentTask = dragTask.current;
        if(e.target !== dragNode.current) {
            console.log("Target is different");
            setList(currentList =>{
                const newList = JSON.parse(JSON.stringify(currentList));
                newList[indexArr.processIndex].tasks.splice(indexArr.taskIndex, 0, newList[currentTask.processIndex].tasks.splice(currentTask.taskIndex,1)[0]);
                dragTask.current = indexArr;
                return newList;
            })
        }
    }

    const dragEnd = () =>{
        console.log('ending drag');
        dragTask.current = null;
        dragNode.current = null;
        setDragging(false);
    }

    const setStyles = (indexArr) =>{
        const currentTask = dragTask.current;
        if(currentTask.processIndex === indexArr.processIndex && currentTask.taskIndex == indexArr.taskIndex){
            return 'dragging task'
        }
        return 'task'
    }

    return(
        <div className="kanban">
          {list.map((process, processIndex)=>(
            <div 
                className="process" 
                key={process.name}
                onDragEnter={dragging && !process.tasks.length ? (e)=> dragEnter(e,{processIndex, taskIndex:0}):null}
            >
              <div className="process-name">{process.name}</div>
              {process.tasks.map((task, taskIndex)=>(
                //passing task index to drag event to memorize position
                <div 
                    //changes styles depending on dragging state
                    className={dragging?setStyles({processIndex, taskIndex}):"task" }
                    key={task} 
                    draggable 
                    onDragStart={(e) =>{dragStart(e, {processIndex, taskIndex})}}
                    onDragEnter={dragging?(e)=>(dragEnter(e,{processIndex, taskIndex})):null}
                >
                  {task}
                </div>
              ))}
            </div>
          ))}
        </div>
    )
}