import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { v4 as uuidv4 } from 'uuid';

export default function Veggie() {
    const [veggie, setVeggie] = useState([]);
 
    useEffect(() => {
      getVeggie();
    }, []);
  
    const getVeggie = async () => {
  
      const check = localStorage.getItem("veggie");
      if (check) {
          setVeggie(JSON.parse(check))
      } else {
          const api = await fetch(
              `https://api.edamam.com/api/recipes/v2?type=public&q=vegetarian&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&random=true`
            );
            const data = await api.json();
            const recipes = data.hits;
            localStorage.setItem("veggie", JSON.stringify(recipes))
            setVeggie(recipes);      
      }   
    };
  return (
    <div>
      <Wrapper>
        <h3>Our vegetarian picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={uuidv4()}>
                <Card>
                  <p>{recipe.recipe.label}</p>
                  <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

