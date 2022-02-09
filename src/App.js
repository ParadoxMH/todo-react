import React from 'react';
import { ListItem } from './components/ListItem';
import { TaskField } from './components/TaskField';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import {WalletConnector} from './components/WalletConnector'

function App({ Component, pageProps }) {
  const [tasks, setTasks] = React.useState([
    {
      text: 'Изучить ReactJS',
      completed: true,
    },
    {
      text: 'Разработать ToDo на ReactJS',
      completed: false,
    },
  ]);

  const onToggleCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, curIdx) =>
        index === curIdx
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const onRemoveTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, curIdx) => index !== curIdx));
  };

  const onAddTask = (text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        text,
        completed: false,
      },
    ]);
  };

  function getLibrary(provider) {
    return new Web3(provider)
  }

  return (
    <div className="todo">
      <div className="todo__header">
        <h4>NFT mint!</h4>
      </div>

      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletConnector {...pageProps} />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
