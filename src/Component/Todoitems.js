/** @format */
import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
const Todoitems = ({
  item,
  totalTask,
  setTotalTask,
  filtertasklist,
  setfiltertasklist,
}) => {
  const [itemselect, setitemselect] = useState(true);
  useEffect(() => {
    console.log('filtertasklist', filtertasklist);
  }, [filtertasklist]);
  function handleEdit(e) {
    setfiltertasklist((current) =>
      current.map((obj) => {
        if (item.id === obj.id) {
          return { ...obj, name: e.target.value };
        }
        console.log(obj);
        return obj;
      })
    );

    setTotalTask((current) =>
      current.map((obj) => {
        if (item.id === obj.id) {
          return { ...obj, name: e.target.value };
        }

        return obj;
      })
    );
  }
  function handleComplete(e) {
    console.log(e.target.checked);
    setfiltertasklist((current) =>
      current.map((obj) => {
        if (item.id === obj.id) {
          return { ...obj, isCompleted: e.target.checked };
        }
        console.log(obj);
        return obj;
      })
    );
    setTotalTask((current) =>
      current.map((obj) => {
        if (item.id === obj.id) {
          return { ...obj, isCompleted: e.target.checked };
        }

        return obj;
      })
    );
  }
  function deleteTask() {
    console.log('deleteTask called', totalTask);
    let newAllTasklist = totalTask.filter((e) => {
      return item.id !== e.id;
    });
    let newfilterTasklist = filtertasklist.filter((e) => {
      return item.id !== e.id;
    });

    setTotalTask(newAllTasklist);
    setfiltertasklist(newfilterTasklist);
  }
  function handleItemSelect() {
    setitemselect((prev) => {
      return !prev;
    });
  }
  return (
    <li className='taskListContainer'>
      <div className='d-flex'>
        <div className='d-flex' onClick={handleItemSelect}>
          <input
            checked={item.isCompleted}
            className='toggle'
            onChange={handleComplete}
            type='checkbox'></input>
          <input
            onChange={handleEdit}
            className='taskName'
            style={{ textDecoration: item.isCompleted && 'line-through' }}
            value={item.name}></input>
        </div>
        {itemselect && (
          <p onClick={deleteTask}>
            <CloseOutlined />
          </p>
        )}
      </div>
    </li>
  );
};

export default Todoitems;
