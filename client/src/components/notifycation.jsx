import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

var Notification = function() {
    const notification = {
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000
        }
    };

    const show = (props) => {
        store.addNotification({
            ...notification,
            title: props.title,
            type: props.type,
            message: props.message
        })
    }

    return {show: show};
}();
export default Notification;