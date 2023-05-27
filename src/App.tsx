import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App(): JSX.Element {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Houses", isDone: true},
            {id: v1(), title: "Cars", isDone: true},
            {id: v1(), title: "Yachts", isDone: false},
        ]
    });

    function removeTask(id: string, todoListId: string) {
        // const tasksArrayAfterDelete: Array<TaskType> = tasks[todoListId].filter(t => t.id != id)
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterDelete
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const tasksArrayAfterAdd: Array<TaskType> = [newTask, ...tasks[todoListId]]
        // const copyTasks: TasksStateType  = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterAdd
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    function changeTodolistFilter(filter: FilterValuesType, todoListId: string) {
        setTodoList(todoList.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    return (
        <div className="App">
            {todoList.map((tl) => {
                let tasksForTodolist: Array<TaskType> = [];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }
                if (tl.filter === "all") {
                    tasksForTodolist = tasks[tl.id]
                }
                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    changeTaskStatus={changeTaskStatus}
                />
            })}
        </div>
    );
}



//     const todolistComponents: Array<JSX.Element> = todoList.map((tl) => {
//         let tasksForTodolist: Array<TaskType> = [];
//
//         if (tl.filter === "active") {
//             tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
//         }
//         if (tl.filter === "completed") {
//             tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
//         }
//         if (tl.filter === "all") {
//             tasksForTodolist = tasks[tl.id]
//         }
//         return <Todolist
//             key={tl.id}
//             todolistId={tl.id}
//             title={tl.title}
//             filter={tl.filter}
//             tasks={tasksForTodolist}
//
//             addTask={addTask}
//             removeTask={removeTask}
//             changeTodolistFilter={changeTodolistFilter}
//             changeTaskStatus={changeTaskStatus}
//         />
//     })
//     return (
//         <div className="App">
//             {todolistComponents}
//         </div>
//     );
// }

export default App;
