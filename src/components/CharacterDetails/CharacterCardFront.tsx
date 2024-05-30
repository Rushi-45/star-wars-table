import React from "react";
import { Image, Text } from "@mantine/core";
import { motion } from "framer-motion";
import styles from "./CharacterDetails.module.css";

interface CharacterCardFrontProps {
  imageUrl: string;
  name: string;
  onClick: () => void;
}

const CharacterCardFront: React.FC<CharacterCardFrontProps> = ({
  imageUrl,
  name,
  onClick,
}) => {
  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div className={styles.cardFront} whileHover={{ rotate: 2 }}>
        <motion.div
          className={styles.cardFrontImageWrapper}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={imageUrl}
            alt="Character"
            className={styles.cardFrontImage}
            style={{ maxWidth: "100%", maxHeight: 200 }}
          />
        </motion.div>
        <motion.div
          className={styles.cardFrontText}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Text className={styles.cardFrontName}>
            <strong>Name:</strong> {name}
          </Text>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterCardFront;
