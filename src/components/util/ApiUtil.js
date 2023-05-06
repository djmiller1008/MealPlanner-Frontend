import axios from "axios";
import { API_KEY } from "./keys_prod";
import Cookies from "js-cookie";
import { parseRegisterError } from "./ParseErrorUtil";

const getSpringRequestConfig = (token) => {
    return { headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }}
}

export const fetchRecipeSearchResults = async (searchQuery, searchFilters) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`, {
            params: { query: searchQuery, ...searchFilters }
        }).catch(error => {
            if (error.response.status === 402) {
                return {
                    message: "Daily API request limit reached. Please try again later."
                }
            }
        })
    if (response.status === 200) {
        if (response.data.results.length === 0) {
            return {
                message: "No Results"
            }
        } else {
            return response.data.results;
        }
    }
    return response;
}

export const parseRecipeInstructions = async recipeId => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${API_KEY}`, {
    }).catch(error => {
        if (error.response.status === 402) {
            return {
                message: "Daily API request limit reached. Please try again later."
            }
        }
    })
    if (response.status === 200) {
        // Instructions are here
        return response.data[0].steps;
    }
    return response;
}

export const fetchRecipeInfo = async recipeId => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`, {
    }).catch(error => {
        if (error.response.status === 402) {
            return {
                message: "Daily API request limit reached. Please try again later."
            }
        }
    });
    if (response.status === 200) {
        return response.data;
    }
    return response;
}

export const fetchRecipeNutritionInfo = async recipeId => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`);
    return response.data;
}

export const login = async user => {
    const response = await axios.post('api/auth/login', user).catch(error => {
        if (error.response.status === 401) {
            return {
                user: null,
                message: ['Invalid Credentials']
            }
        } 
    })
    return response;
}

export const demoLogin = async () => {
    const response = await axios.post('api/auth/demo');
    return response;
}

export const logout = async () => {
    const response = await axios.get('/api/auth/logout');
    Cookies.remove("jwt");
    return response;
}

export const register = async user => {
    const response = await axios.post('api/users/register', user).catch(error => {
        if (error.response.status === 401) {
            return {
                user: null,
                message: ['Username already exists']
            }
        } else if (error.response.status === 400) {
            return {
                user: null,
                message: parseRegisterError(error.response.data)
            }
        }
    })
  
    return response;
}

export const addUserRecipe = async recipeData => {
    const response = await axios.post('/api/user-meals', recipeData);
    return response;
} 

export const createUserMealPlan = async (mealPlanData, token) => {
    const response = await axios.post('api/user-mealplans', mealPlanData, getSpringRequestConfig(token));
    return response;
}

export const fetchUserMealPlans = async (token) => {
    const response = await axios.get('api/user-mealplans', getSpringRequestConfig(token));
    return response;
}

export const addMealToMealPlan = async (mealData, token) => {
    const response = await axios.post('api/user-meals', mealData, getSpringRequestConfig(token));
    return response;
}

export const fetchUserMealPlanMeals = async (mealPlanId, token) => {
    const response = await axios.get(`/api/user-mealplans/${mealPlanId}`, getSpringRequestConfig(token));
    return response;
} 

export const deleteMealFromMealPlan = async (mealPlanId, mealId, token) => {
    const response = await axios.delete(`/api/user-meals/${mealPlanId}/${mealId}`, getSpringRequestConfig(token));
    return response;
}

export const deleteMealPlan = async (mealPlanId, token) => {
    const response = await axios.delete(`/api/user-mealplans/${mealPlanId}`, getSpringRequestConfig(token));
    return response;
}

export const validateJwtToken = async token => {
    const response = await axios.get(`/api/auth/validate?token=${token}`, getSpringRequestConfig(token));
    return response;
}