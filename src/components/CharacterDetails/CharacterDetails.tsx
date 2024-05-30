import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper } from "@mantine/core";
import { Character } from "../../interfaces/TableInterfaces";
import StarWarsService from "../../services/StarWarService";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CharacterDetails.module.css";
import CharacterCardFront from "./CharacterCardFront";
import CharacterCardBack from "./CharacterCardBack";
import StarWarsLoader from "../StarWarsLoader/StarWarsLoader";

const CharacterDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFront, setIsFront] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      const starWarsService = new StarWarsService();
      const characters = await starWarsService.getCharacters();
      const foundCharacter = characters?.find(
        (char) => char.name.replace(/ /g, "") === name
      );

      if (foundCharacter) {
        setCharacter(foundCharacter);
        const imageResponse = await fetch(
          `https://starwars-visualguide.com/assets/img/characters/${
            foundCharacter.url.match(/\/api\/people\/(\d+)\//)?.[1]
          }.jpg`
        );
        if (imageResponse.ok) {
          setImageUrl(imageResponse.url);
        } else {
          setImageUrl(null);
        }
      } else {
        setCharacter(null);
      }
      setLoading(false);
    };

    fetchCharacter();
  }, [name]);

  const handleCardClick = () => {
    setIsFront(!isFront);
  };

  if (loading) {
    return <StarWarsLoader />;
  }

  if (!character) {
    return <div className={styles.loaderContainer}>Character not found</div>;
  }

  return (
    <Container size="lg" className={styles.container}>
      <Paper className={styles.paper}>
        <AnimatePresence initial={false}>
          <motion.div
            key={isFront ? "front" : "back"}
            initial={false}
            animate={{ rotateY: isFront ? 360 : 0 }}
            exit={{ rotateY: 0 }}
            transition={{ duration: 0.6, animationDirection: "normal" }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {isFront ? (
              <CharacterCardFront
                imageUrl={imageUrl!}
                name={character.name}
                onClick={handleCardClick}
              />
            ) : (
              <CharacterCardBack
                character={character}
                onClick={handleCardClick}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Container>
  );
};

export default CharacterDetails;
