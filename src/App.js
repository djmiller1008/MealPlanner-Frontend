import './styles/index.css';
import MealSearch from './components/meal/mealSearch/MealSearch';
import MealItem from './components/meal/mealItem/MealItem';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import { PrivateRoute }from './components/util/RouteUtil';
import Dashboard from './components/home/Dashboard';
import CreateMealPlan from './components/mealPlan/CreateMealPlan';
import AddToMealPlan from './components/mealPlan/AddToMealPlan';
import MealPlanShow from './components/mealPlan/MealPlanShow';
import LandingPage from './components/landing/LandingPage';
import { UserProvider } from './components/userProvider/UserProvider';
import Register from './components/auth/Register';
import UserMealItem from './components/meal/mealItem/UserMealItem';


function App() { 
 
  return (
    <>
      <UserProvider>
        <Switch>
          <Route exact path='/home' component={LandingPage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path='/search' component={MealSearch} />
          <Route exact path='/meal/:id' component={MealItem} />
          <PrivateRoute exact path='/create' component={CreateMealPlan} />
          <PrivateRoute exact path='/addMeal' component={AddToMealPlan} />
          <PrivateRoute exact path='/mealPlan/:id' component={MealPlanShow} />
          <PrivateRoute exact path='/meal/:mealPlanId/:mealId' component={UserMealItem} />
        </Switch>
      </UserProvider>
    </>
  ) 
}

export default App;
