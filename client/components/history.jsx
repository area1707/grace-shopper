import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory'

//const history = createHistory();
const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history;
