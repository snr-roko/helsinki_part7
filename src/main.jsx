import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { initialBlogsSetting } from "./reducers/blogReducer";
import userReducer, {setLoggedInUser} from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
        user: userReducer
    }
})


store.dispatch(initialBlogsSetting())
store.dispatch(setLoggedInUser())

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
