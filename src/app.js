import React from 'react';
import {getDeclination} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 */
function App({store}) {

  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-info'>
                  <div className="Item-title">
                    {item.title}
                  </div>
                  {item.clickCount > 0 && <div className="Item-clicked"> | Выделяли {getDeclination(item.clickCount, "раз", "раза", "раз")}</div>}
                </div>
                <div className='Item-actions'>
                  <button onClick={(e) => {
                      e.stopPropagation();
                      store.deleteItem(item.code)
                  }}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
