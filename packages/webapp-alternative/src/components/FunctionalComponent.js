import { useState } from 'react'

const FunctionalComponent = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count => count + 1);
  };

  const handleDecrease = () => {
    setCount(count => count - 1);
  };

  const handleReset = () =>{
    setCount(0)
  }

  return (
    <div className='functional-component'>
      <h2>I'm Functional Component</h2>
      <span>{count}</span>
      <div>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
};

export default FunctionalComponent;
