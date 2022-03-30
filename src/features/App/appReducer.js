import useAppContext from './appContext'
import { cloneDeep } from 'lodash'

export const initState = {
  loading: false,
  alerts: [],
}

export function initializeState(state) {
  return cloneDeep(state)
}

const ACTIONS = {
  SET_LOADING: 'set-loading',
  SET_ALERT: 'set-alert',
  POP_ALERT: 'pop-alert',
  RESET: 'reset',
}

export function AppContainerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] }
    case ACTIONS.POP_ALERT:
      return { ...state, alerts: state.alerts.filter(alert => alert.message !== action.payload) }
    case ACTIONS.RESET:
      return initializeState(initState)
    default:
      return state
  }
}

export default function useApp() {
  const { state, dispatch } = useAppContext()

  /**
   * Set loading true or false
   *
   * @param status
   * @returns {*}
   */
  const setLoading = status => dispatch({ type: ACTIONS.SET_LOADING, payload: status })

  /**
   * Show alert
   *
   * @param payload: { message: <String>, type: <info | danger | warn | success>}
   */
  function showAlert(payload) {
    const existingAlerts = state?.alerts?.findIndex(alert => alert?.message === payload?.message)
    if (existingAlerts < 0) {
      dispatch({ type: ACTIONS.SET_ALERT, payload })
      setTimeout(() => {
        closeAlert(payload.message)
      }, 5000)
    }
  }

  /**
   * Close alert
   *
   * @param payload
   */
  function closeAlert(payload) {
    dispatch({ type: ACTIONS.POP_ALERT, payload })
  }

  return {
    appState: state,
    setLoading,
    showAlert,
    closeAlert,
  }
}
