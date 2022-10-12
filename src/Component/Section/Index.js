/** @format */

import React, { useState, useEffect } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Todoitems from '../Todoitems';
const Index = () => {
  const [openlist, setopenlist] = useState(false);
  const [taskname, settaskName] = useState('');
  const [totalTask, setTotalTask] = useState([]);
  const [filtertasklist, setfiltertasklist] = useState([]);
  const [totalLeft, setTotalLeft] = useState([]);
  useEffect(() => {
    setfiltertasklist(totalTask);
    let totalleft = totalTask.filter((e) => {
      return e.isCompleted === false;
    });
    setTotalLeft(totalleft.length);
  }, [totalTask]);

  const itemFilter = (type) => {
    let finallist;

    if (type === 'active') {
      finallist = totalTask.filter((e) => {
        return e.isCompleted === false;
      });
    } else if (type === 'completed') {
      finallist = totalTask.filter((e) => {
        return e.isCompleted === true;
      });
    } else if (type === 'clearComplete') {
      finallist = totalTask.filter((e) => {
        return e.isCompleted === false;
      });

      setTotalTask(finallist);
    } else {
      finallist = totalTask;
    }
    console.log(finallist);
    setfiltertasklist(finallist);
  };
  const handleList = () => {
    setopenlist((prev) => {
      return !prev;
    });
  };
  const inputTask = (e) => {
    settaskName(e.target.value);
  };
  const CreateTask = (event) => {
    event.preventDefault();

    let obj = {
      id: Math.floor(Math.random() * 1000),
      name: taskname,
      isCompleted: false,
    };
    setTotalTask((prev) => {
      return [...prev, obj];
    });
    settaskName('');
  };

  return (
    <div>
      <h1 className='todo_list_heading'>Todos</h1>
      <div>
        <form onSubmit={CreateTask}>
          <span className='todolistopener' onClick={handleList}>
            {openlist ? (
              <DownOutlined style={{ fontSize: '24px', fontWeight: 'bold' }} />
            ) : (
              <UpOutlined style={{ fontSize: '24px', fontWeight: 'bold' }} />
            )}
          </span>
          <input
            class='Input-todo'
            placeholder='What needs to be done?'
            autofocus=''
            onChange={inputTask}
            value={taskname}></input>
          <button style={{ display: 'none' }} type='submit'></button>
        </form>

        <div style={{ display: openlist ? 'none' : 'block' }}>
          <ul class='todo-list'>
            {filtertasklist.map((item, index) => {
              return (
                <Todoitems
                  item={item}
                  totalTask={totalTask}
                  setTotalTask={setTotalTask}
                  filtertasklist={filtertasklist}
                  setfiltertasklist={setfiltertasklist}
                  key={`taskitem_${index}`}></Todoitems>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='filterButtons'>
        <span>
          <strong>{totalLeft} item left</strong>
        </span>
        <div>
          <span
            onClick={() => {
              itemFilter('all');
            }}
            className=' buttondesign'>
            All
          </span>
          <span
            onClick={() => {
              itemFilter('active');
            }}
            className=' buttondesign'>
            Active
          </span>
          <span
            onClick={() => {
              itemFilter('completed');
            }}
            className=' buttondesign'>
            Completed
          </span>
        </div>
        <span
          className='clearComplete'
          onClick={() => {
            itemFilter('clearComplete');
          }}>
          Clear completed
        </span>
      </div>
    </div>
  );
};

export default Index;
