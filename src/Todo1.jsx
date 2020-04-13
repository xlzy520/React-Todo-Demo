import React, {useEffect, useState} from 'react';
import { fetchTodoList, fetchDeleteItem, fetchUpdate } from "./services";


const Todo1 = ({user}) => {
    const [todoList, setTodoList] = useState([{todo:'', completed:false}]);
    function Item({ item, itemId, completeItem, deleteItem }) {
        return (
            <div
                className="item"
                style={{ textDecoration: item.completed ? "line-through" : "" }}
            >
                {item.title}
                <button style={{ background: "red" }} onClick={() => deleteItem(itemId)}>x</button>
                <button onClick={() => completeItem(itemId)}>Complete</button>
                <button onClick={() => updateItem(itemId)}>Update task</button>

            </div>
        );
    }

    useEffect(() => {
        const username = user.username;
        fetchTodoList(username)
            .then((data) => {
            setTodoList(data.data)
        })
    },[]);

    const deleteItem = (ItemId) => {
        fetchDeleteItem(ItemId)
            .then((data) => {
                setTodoList(data.data);
            })
    };

    const completeItem = (ItemId, item) => {
        fetchUpdate(user.username, ItemId, item)
            .then((data) => {
                const newTodos = [...todoList];
                newTodos[ItemId].completed = true;
                setTodoList(newTodos);
            })
    };

    const updateItem = (itemId, item) => {}

    return(
        <li className="todo-list">
            {Object.values(todoList).map((item,index) => (
                <Item
                    item={item.todo}
                    itemId={itemId.taskId}
                    completeItem={completeItem}
                    deleteItem={deleteItem}
                    key={index}
                />
            ))}
        </li>
    );
};

export default Todo1;