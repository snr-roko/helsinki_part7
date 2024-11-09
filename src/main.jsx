import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { initialBlogsSetting } from "./reducers/blogReducer";

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer
    }
})


store.dispatch(initialBlogsSetting())


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
