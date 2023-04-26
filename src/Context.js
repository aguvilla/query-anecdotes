import { createContext, useContext, useReducer } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch(action.type) {
		case 'ADD':
			return `anecdote: '${action.data}' is added`
		case 'VOTE':
			return `anecdote: '${action.data}' is voted`
		case 'ERROR':
			return `ERROR: ${action.data}`
		case 'CLEAR':
			return ''
	default:
		return state
	}
}
export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNoticationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}
export const useNoticationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}


export default NotificationContextProvider