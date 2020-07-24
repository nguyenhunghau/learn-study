import React, { useState } from "react";
import { connect } from 'react-redux';
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
    // const [count, setCount] = useState(0);

    const increment = () => {
        props.increment();
        // props.dispatch({ type: "INCREMENT" });
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
                <span>{props.count || 0}</span>
                <button onClick={increment}>+</button>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
