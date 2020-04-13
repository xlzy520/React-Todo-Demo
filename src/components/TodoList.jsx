import React, {useEffect, useState} from 'react';
import {fetchTodoList, removeTask, updateTask} from "../services";
import Complete from '../icons/complete.svg'
import unComplete from '../icons/uncomplete.svg'
import Modal from './Modal'
//
// function Task({ task, index, completeTask, removeTask }) {
//     return (
//         <div
//             className="task"
//             style={{ textDecoration: task.completed ? "line-through" : "" }}
//         >
//             {task.title}
//
//             <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
//             <button onClick={() => completeTask(index)}>Complete</button>
//
//         </div>
//     );
// }
//
// const [tasks, setTasks] = useState([
//     {
//         title: "Grab some Pizza",
//         completed: true
//     }
// ]);


const TodoList = ({user, trigger, updateList}) => {
  const [todoList, setTodoList] = useState([]);
  const [cacheTodoList, setCacheTodoList] = useState([]);
  const [query, setQuery] = useState(0);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [filer, setFilter] = useState('')
  const [visible, setVisible] = useState(false);
  
  const [todoItem, setTodoItem] = useState({
    task: {
      content: ''
    }
  });
  
  let nameSortSelect = {}
  let statusSortSelect = {}
  let filterSelect = {}
  
  
  const handleRemoveClick = (taskId) => {
    removeTask(user.username, taskId).then(res => {
      setQuery(Date.now)
    });
  };
  const handleUpdateTask = (task, status) => {
    task.task.isComplete = status
    updateTask(user.username, task).then(res => {
      setQuery(Date.now)
    });
  };
  
  const handleUpdateTaskContent = (task) => {
    updateTask(user.username, task).then(res => {
      setQuery(Date.now)
      setVisible(false)
    });
  };
  
  const handleEdit = (todoItem) => {
    setTodoItem(todoItem)
    setVisible(true)
  }
  
  const computedDiff = (aValue, bValue, value, type)=>{
    let diff
    if (aValue === bValue) {
      diff = 0
    } else if (aValue > bValue) {
      diff = 1
    } else {
      diff = -1
    }
    if (value === type) {
      return -diff
    }
    return diff
  }
  
  const handleSortChange = (value, type) => {
    if (type === 'name') {
      if (statusSortSelect) {
        statusSortSelect.value = 'none'
      }
      setName(value)
      setStatus('')
      const sortTodoList = [...todoList].sort((a, b) => {
        const aValue = a.task.content
        const bValue = b.task.content
        return computedDiff(aValue, bValue, value, 'descending')
      })
      setTodoList(sortTodoList)
    } else {
      setStatus(value)
      setName('')
      if (nameSortSelect) {
        nameSortSelect.value = 'none'
      }
      const sortTodoList = [...todoList].sort((a, b) => {
        const aValue = a.task.isComplete
        const bValue = b.task.isComplete
        return computedDiff(aValue, bValue, value, 'Done')
      })
      setTodoList(sortTodoList)
    }
  }
  
  const handleFilterChange = (value) =>{
    setFilter(value)
    if (value === 'All') {
      setTodoList(cacheTodoList)
    } else {
      const status = value === 'Done'
      const newList = cacheTodoList.filter(value => value.task.isComplete === status)
      setTodoList(newList)
    }
  }
  
  const handleRefresh = () => {
    const username = user.username;
    fetchTodoList(username)
      .then((data) => {
        const list = data.data
        const result = Object.keys(list).map(v => {
          return list[v]
        })
        setTodoList(result)
        setCacheTodoList(result)
        handleFilterChange(filer)
        if (name) {
          handleSortChange(name, 'name')
        } else {
          handleSortChange(status, 'status')
        }
      
      })
  };
  
  
  useEffect(() => {
    const username = user.username;
    fetchTodoList(username)
      .then((data) => {
        const list = data.data
        const result = Object.keys(list).map(v => list[v])
        setTodoList(result)
        setCacheTodoList(result)
      })
  }, [query, trigger]);
  
  
  // console.log('todoList->', todoList);
  
  // const deleteItem = (taskId) => {
  //     fetchDeleteItem(taskId)
  //         .then((data) => {
  //             setTodoList(data.tasks);
  //         })
  // };
  
  // const completeTask = index => {
  //     const newTasks = [...tasks];
  //     newTasks[index].completed = true;
  //     setTasks(newTasks);
  // };
  
  // const removeTask = (taskId) => {
  //     fetchRemoveTask(user.username, taskId);
  // };
  
  const renderList = () =>{
    return (
      <div className="todo-list">
        {todoList.map((todoItem, index) => (
          <div key={todoItem.taskId} className="todo-list-item">
            {
              todoItem.edit ? (
                <input className="funky-input" value={todoItem.content}
                       onChange={(e) =>
                         handleUpdateTaskContent({...todoItem, content: e.target.value})}/>
              ) : <span>{index + 1}、 </span>
            }
            <span className={`todo-list-item-content ${todoItem.task.isComplete? 'todo-complete': null}`}>
                        {todoItem.task.content}
                    </span>
            <img className="icon" src={todoItem.task.isComplete ? Complete : unComplete}
                 title={todoItem.task.isComplete ? 'Complete' : 'unComplete'}/>
            <div className="todo-list-btns">
              <button className="funky-btn funky-btn-primary"
                      onClick={() => handleEdit(todoItem)}>Edit
              </button>
              <button className="funky-btn funky-btn-primary"
                      onClick={() => handleUpdateTask(todoItem, true)}>Mark Done
              </button>
              <button className="funky-btn"
                      onClick={() => handleUpdateTask(todoItem, false)}>Mark Not Done
              </button>
              <button className="funky-btn funky-btn-primary funky-btn-dangerous"
                      onClick={() => handleRemoveClick(todoItem.taskId)}>Remove
              </button>
            </div>
      
          </div>
        ))}
      </div>

    )
  }
  
  
  return (
    <div className="todo-list-container">
      <Modal title="Edit Todo Name" onCancel={()=>setVisible(false)}
             onOk={() => handleUpdateTaskContent(todoItem)} visible={visible}>
        <div className="change-name">
          <span>new name: </span>
          <input className="funky-input"
                 value={todoItem.task.content}
                 onChange={(e) =>
                   setTodoItem({...todoItem, task: {...todoItem.task, content: e.target.value}})}/>
        </div>
      </Modal>
      <div className="todo-list-header">
        <div className="title">TODO LIST</div>
  
        <button className="funky-btn funky-btn-primary"
                onClick={handleRefresh}>Refresh
        </button>
      </div>
      <div className="filter">
        Filter:
        <select ref={ref=> (filterSelect = ref)} onChange={event => handleFilterChange(event.target.value)}>
          <option>All</option>
          <option>Done</option>
          <option>Not Done</option>
        </select>
      </div>
      <div className="sort">
        Sort:
        <div className="sort-item">
         name:
          <select ref={ref=> (nameSortSelect = ref)} onChange={event => handleSortChange(event.target.value, 'name')}>
            <option>none</option>
            <option>ascending</option>
            <option>descending</option>
          </select>
        </div>
        <div className="sort-item">
          status:
          <select ref={ref=> (statusSortSelect = ref)} onChange={event => handleSortChange(event.target.value, 'status')}>
            <option>none</option>
            <option>Done</option>
            <option>Not Done</option>
          </select>
        </div>
       
      </div>
      {renderList()}
    </div>
  
  );
};

export default TodoList;
