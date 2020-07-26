import React, { useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import {increment, decrement} from '../../redux/action/action-counter';

// Add this function:
function mapStateToProps(state) {
    return {
        count: state.counter.count
    };
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => increment(dispatch),
        decrement: () => decrement(dispatch)
    }
};

function Counter(props) {
    const dispatch = useDispatch();
    const count = useSelector(state =>  state.counter.count);
    // const [count, setCount] = useState(0);

    const increment = () => {
        // props.increment();
        dispatch({ type: "INCREMENT" });
        // console.log(props);
        // setCount(props.count);
        // setCount(count + 1);
    };

    const decrement = () => {
        props.decrement();
        // setCount(count - 1);
        // props.dispatch({ type: "DECREMENT" });
    };

    return (
        <div className="counter">
            <h2>Counter</h2>
            <div>
                <button onClick={decrement}>-</button>
                <span>{count || 0}</span>
                <button onClick={increment}>+</button>
            </div>
        </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default Counter;
