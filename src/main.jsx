import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { initialBlogsSetting } from "./reducers/blogReducer";
import userReducer, {setLoggedInUser} from './reducers/userReducer'
import usersReducer, {initializeUsers} from './reducers/usersReducer'
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        users: usersReducer
    }
})


store.dispatch(initialBlogsSetting())
store.dispatch(setLoggedInUser())
store.dispatch(initializeUsers())

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
