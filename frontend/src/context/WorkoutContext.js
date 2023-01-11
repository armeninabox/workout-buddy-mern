import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload, //
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  // simile allo useState pero' prende una funzione e unop stato iniziale ({ workouts: null }).
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  // creo la funzione dispatch dove passo un oggetto come argument e questo oggetto dovrebbe avere un prorpieta' type (solitamente una stringa in maiuscolo che descrive il tipo di cambiamento che vogliamo fare), il secondo e' un la proprieta' payload (rappresenta quealsiasi dato che ci serve per fare questo cambiamento. in questo caso un array di oggetti workout ). L'argomento inserito dentro dispatch viene chiamato Action.

  //Quando chiamiamo la funzione dispatch la funzione reducer scatta (in questo caso la workoutReducer, che passa l'action dentro la funzione reducer in maniera che possa aggiornare lo state con le informazioni che gli sono state date)

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
