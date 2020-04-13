import React, { useState } from "react";
import {fetchAddTask, removeAllTask} from "../services";
import messages from "../messages";
import spinner from "../icons/spinner.svg";

const AddTask = ({changeCount, user}) => {
    const [task, setTask] = useState({content:'', isComplete: false});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const addTask = () => {
        if (!task.content) {
            setError(messages.TASK_TEXT_REQUIRED);
            return;
        }

        //set output for while we wait
        setError("");
        setIsLoading(true);
        //start service call
        fetchAddTask({task}, user.username)
            .then((data) => {
                changeCount(data.data.taskId);
                setIsLoading(false);
                setError("");
                setTask({
                  content: ''
                })
            })
            .catch((err) => {
                setError(messages[err.code || "DEFAULT"]);
                setIsLoading(false);
            });
    };
  
  const handleRemoveAllTask = ()=>{
    removeAllTask(user.username).then(()=>{
      changeCount(0);
    })
  }

    return (
        <div className="add-task">
          <div className="add-task-header">
            <input className="funky-input" value={task.content} onChange={(e) => setTask({content: e.target.value, isComplete: false})} />
            {isLoading ? (
              <img alt="spinner" src={spinner} />
            ) : (
              <button className="funky-btn funky-btn-primary" onClick={addTask}>Add</button>
            )}
            <button className="funky-btn funky-btn-primary funky-btn-dangerous remove" onClick={handleRemoveAllTask}>Remove All</button>

          </div>
          {error?  <p className="error">{error}</p> : null}
        </div>
    )
};

export default AddTask;
