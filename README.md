# react-admin-template
#### TODO: Description

# Initial Set-up
- go to [react-admin-template](https://github.com/inme-digital-services/react-admin-template) and click use this template to create a new repository with this template
- clone the project and run 
    - yarn install or npm install
    - yarn start or npm start

# Folder structure inside src
### app
<p>Contains app configurations and constants</p>

- Context Store
- Axios
- ENVs
- firebase
- API endpoints
- Config strings

### assets
<p>store media assets required for the application</p>

### components
<p>Include all the custom re-usable components here</p>

### features
<p>Contains all the features in folders and their behaviours such as Layout Component, Specific Custom Components, context setup and reducer</p>

- Home
    - homeContext
    - homeReducer
    - index (Layout)
    - Modals (Specific Custom components)
- Users
  - homeContext
  - homeReducer
  - index (Layout)
  - Modals (Specific Custom components)

### styles
<p>Custom scss style functions to be used later</p>

# Modules
- UI Components Library: AntDesign
- Dates: date-fns
- Testing: jest
- Routing: react-router-dom
- Validations: validate.js
- Support: lodash
- Type checking: prop-types
- CSS Preprocessor: sass
- API: axios
- Linting: eslint
- Code formatting: prettier

# Context usage
## Create new feature
### Add a folder with name of the feature inside the features page
#### Add an featureContext.js file which contains the context provider of the feature
~~~js
  const FeatureContext = createContext({})

  export default function useFeatureContext() {
    return React.useContext(FeatureContext)
  }
  
  function FeatureNameProvider({ children }) {
      const [state, dispatch] = React.useReducer(StoreNameReducer, initialState, initializeState)
  
    return <FeatureContext.Provider value={{ state, dispatch }}>{children}</FeatureContext.Provider>
  }

  FeatureNameProvider.propTypes = {
    children: any
  }
  
  export {FeatureNameProvider}
~~~

#### Add featureReducer.tsx file which contains the initial state, reducer, and the featureReducer custom hook
~~~js
    export function featureReduder(state, {type, payload}) {
        switch(type) {
          case ACTIONS.CHANGE_STATE:
              return {...state, value: payload}
        }
    }

    export function useFeature() {
        const {state, dispatch} = useFeatureContext();
    
        function changeState(updatedValues) {
            //Do something
            dispatch({type: ACTIONS.CHANGE_STATE, payload: updatedValues})
        }
        
        return {
            state,
            actions: {
                changeState
            }
        }
    }
~~~

### Add context provider to the store in the store.js file inside app folder
~~~jsx
function Store({ children }) {
    return (
        <AuthProvider>
            <AppProvider>
              <FeatureProvider>
                {children}
              </FeatureProvider>
            </AppProvider>
        </AuthProvider>
    )
}

Store.propTypes = {
    children: any
}

export default Store
~~~

## Use created context store inside components
- All the reducers can be accessed using the custom hook written inside feature folder in every child in the app
~~~js
export default function RandomChildComponent(props) {
    const {state, actions} = useFeature()
  
    return (
        <div>
          <p>{state.value}</p>
          <input type="text" onChange={(event) => actions.changeState(event.target.value)}/>
        </div>
    )
}
~~~

# Unit Testing: TODO
