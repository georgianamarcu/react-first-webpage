import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${name}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&random=true`
    );
    const recipes = await data.json();
    setCuisine(recipes.hits);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return (
    <Grid>
      {cuisine.map((item) => {
        return (
          <Card key={uuidv4()}>
            <img src={item.recipe.image} alt={item.recipe.label} />
            <h4>{item.recipe.label}</h4>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
