import React, { useState } from 'react'
import "../body.css"
import { v4 as uuidv4 } from "uuid"
import { FaTrashAlt, FaEdit } from "react-icons/fa"
import { MdCancel, MdCheck } from "react-icons/md"
import { IconContext } from "react-icons"
import Header from '../components/Header'

export default function Body() {

    const initialList = [
        {
            id: uuidv4(),
            toDoTask: "call a friend",
            checkValue: false,
            selected: false,
            toEdit: false
        },
        {
            id: uuidv4(),
            toDoTask: "buy some bread",
            checkValue: false,
            selected: false,
            toEdit: false
        }]


    const [toDoList, settoDoList] = useState(initialList)
    const [toDoTask, settoDoTask] = useState("")

    const [isChecked, setIsChecked] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState("")

    function handleOnchange(event) {
        settoDoTask(event.target.value)
    }
    function checkIf(value) {
        setIsSelected(value)
    }

    function selectAll() {
        toDoList.forEach(item => {
            checkIfCompleted(item.id)
            if (item.checkValue === true) {
                item.checkValue = true
            }
            else {
                item.checkValue = false
            }
        })
    }

    function addTask() {
        if (toDoTask !== "") {
            const newList = toDoList.concat({
                toDoTask,
                id: uuidv4(),
                checkValue: false,
                selected: false,
                toEdit: false
            })
            settoDoList(newList)
            settoDoTask("")
        }
    }

    function addTaskWithKeyEnter(e) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    function deleteAll() {

        const newList = toDoList.filter(elem => elem.checkValue === false)
        settoDoList(newList)
    }

    function deleteTask(taskId) {

        toDoList.forEach(elem => {
            if (elem.id === taskId) {
                if (elem.checkValue === true) {
                    const newList = toDoList.filter((item) => item.id !== taskId)
                    settoDoList(newList)
                }
                else {
                    elem.selected = true
                    checkIf(elem.selected)
                }
            }
        })
    }

    function checkIfCompleted(item) {
        setIsChecked(!isChecked)
        setIsSelected(isSelected)
        toDoList.forEach(elem => {
            if (elem.id === item) {
                if (elem.checkValue === false) {
                    elem.checkValue = true
                }
                else {
                    elem.checkValue = false
                }
                elem.selected = false
                checkIf(elem.selected)
            }
        })
    }

    function editClicked(itemId) {
        toDoList.forEach(elem => {
            if (elem.id === itemId) {
                setEditText(elem.toDoTask)
                setIsEditing(!isEditing)
                if (elem.toEdit === false) {
                    elem.toEdit = true
                }
                else {
                    elem.toEdit = false
                }
            }
        })
    }
    function handleEditOnchange(event) {
        setEditText(event.target.value)
    }

    function confirmEdit(itemId) {

        toDoList.forEach(elem => {
            if (elem.id === itemId) {
                elem.toDoTask = editText
                elem.toEdit = false
            }
        })
        setIsEditing(!isEditing)
    }

    return (
        <section>
            <Header />

            <section className='main-section'>

                <section className='input-container'>
                    <input type="text"
                        value={toDoTask}
                        placeholder="type your todo..."
                        onChange={handleOnchange}
                        onKeyDown={addTaskWithKeyEnter}></input>
                    <button type='button'
                        className='add-button'
                        onClick={addTask} >Add Task</button>
                </section>

                <section className='selectAll-container'>
                    <button className='select-button' onClick={selectAll}>Select All</button>
                    <button className='deleteAll-selected' onClick={deleteAll}>Delete All Selected</button>
                </section>

                <section className='display-container'>
                    {
                        toDoList.map((item) => (
                            <div className='task-container' key={item.id} >
                                {(item.selected) && <span className="nottag">not yet done !</span>}
                                <div className='singleTask'>
                                    <div className={`task ${item.checkValue ? "active" : ""}`}>
                                        {item.toEdit ?
                                            (<input type="text"
                                                value={editText}
                                                onChange={handleEditOnchange}
                                                className="edit-input" />
                                            )
                                            :
                                            (<span>{item.toDoTask}</span>)
                                        }
                                    </div>
                                    <IconContext.Provider value={{ className: "delete-button" }}>


                                        {item.toEdit ?
                                            (<div className='taskButton-container edits'>
                                                <MdCheck color='green'
                                                    size="25px"
                                                    onClick={() => confirmEdit(item.id)} />
                                                <MdCancel color='red'
                                                    size="20px"
                                                    onClick={() => editClicked(item.id)} />
                                            </div>
                                            )
                                            :
                                            (
                                                <div className='taskButton-container'>
                                                    <div className='check-container'>
                                                        <label>done</label>
                                                        <input className='check'
                                                            type="checkbox"
                                                            checked={item.checkValue}
                                                            onChange={() => checkIfCompleted(item.id)} />

                                                    </div>
                                                    <FaEdit color='blue'
                                                        onClick={() => editClicked(item.id)} />

                                                    <FaTrashAlt color='red'
                                                        onClick={() => deleteTask(item.id)}
                                                    />
                                                </div>



                                            )
                                        }
                                    </IconContext.Provider>
                                </div>

                            </div>
                        ))
                    }
                </section>
            </section >
        </section>
    )
}
