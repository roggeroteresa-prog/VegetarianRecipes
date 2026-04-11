import axios from "axios";

const apiKey ="4639e48265ab468f8bd2406fd66e5b5a";// process.env.REACT_APP_SPOONACULAR_KEY;

export const api = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  params: {
    apiKey
  }
});

export const searchRecipes = (query) =>
  api.get("/complexSearch", {
    params: {
      query,
      diet: "vegetarian",
      number: 20
    }
  });

export const getRecipeDetails = (id) =>
  api.get(`/${id}/information`);
