import React from "react";
import { Text, Badge } from "@mantine/core";
import { Character } from "../../interfaces/TableInterfaces";
import { motion } from "framer-motion";
import styles from "./CharacterDetails.module.css";

interface CharacterCardBackProps {
  character: Character;
  onClick: () => void;
}

const CharacterCardBack: React.FC<CharacterCardBackProps> = ({
  character,
  onClick,
}) => {
  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={styles.cardBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.characterDetails}>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Text>
              <strong>Height:</strong> {character.height}
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Text>
              <strong>Mass:</strong> {character.mass}
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Text>
              <strong>Hair Color:</strong>{" "}
              <Badge color={character.hair_color}>{character.hair_color}</Badge>
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Text>
              <strong>Skin Color:</strong>{" "}
              <Badge color={character.skin_color}>{character.skin_color}</Badge>
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Text>
              <strong>Eye Color:</strong>{" "}
              <Badge color={character.eye_color}>{character.eye_color}</Badge>
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Text>
              <strong>Birth Year:</strong> {character.birth_year}
            </Text>
          </motion.div>
          <motion.div
            className={styles.characterDetailItem}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Text>
              <strong>Gender:</strong> {character.gender}
            </Text>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterCardBack;
