import React, { useState, useEffect } from "react";
import StarWarsService from "../services/StarWarService";
import { Character } from "../interfaces/TableInterfaces";
import { Table, Text, Container, Badge, Paper, TextInput } from "@mantine/core";
import { FaStar } from "react-icons/fa";
import SortableHeader from "./SortableHeader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResourceList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const starWarsService = new StarWarsService();
      const fetchedCharacters = await starWarsService.getCharacters();
      if (fetchedCharacters) {
        setCharacters(fetchedCharacters);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const sortCharacters = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (name: string) => {
    const formattedName = name.replace(/ /g, "");
    navigate(`/list/${formattedName}`);
  };

  const filteredCharacters = characters.filter((character) => {
    const values = Object.values(character).join("").toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  const sortedCharacters = filteredCharacters.sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy as keyof Character];
    const bValue = b[sortBy as keyof Character];

    if (sortOrder === "asc") {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      } else {
        return Number(aValue) - Number(bValue);
      }
    } else {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return bValue.localeCompare(aValue);
      } else {
        return Number(bValue) - Number(aValue);
      }
    }
  });

  return (
    <Container size="lg">
      <Paper
        style={{
          padding: 24,
          backgroundColor: "#000",
          color: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Text align="center" size="xl" style={{ marginBottom: 20 }}>
          <FaStar style={{ marginRight: 8 }} /> Star Wars Characters{" "}
          <FaStar style={{ marginLeft: 8 }} />
        </Text>
        <TextInput
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: 20, color: "#666" }}
        />
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <FaStar size={36} color="#fff" />
            </motion.div>
          </div>
        ) : filteredCharacters.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            No data found
          </div>
        ) : (
          <Table
            striped
            style={{ backgroundColor: "#111", color: "#fff", borderRadius: 8 }}
          >
            <thead>
              <tr>
                <SortableHeader
                  field="name"
                  label="Name"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="height"
                  label="Height"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="mass"
                  label="Mass"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="hair_color"
                  label="Hair Color"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="skin_color"
                  label="Skin Color"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="eye_color"
                  label="Eye Color"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="birth_year"
                  label="Birth Year"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
                <SortableHeader
                  field="gender"
                  label="Gender"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onClick={sortCharacters}
                />
              </tr>
            </thead>
            <tbody>
              {sortedCharacters.map((character, index) => (
                <motion.tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#222" : "#111",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                  onClick={() => handleRowClick(character.name)}
                  whileHover={{
                    scale: 1.04,
                    border: "1px solid #fff",
                    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.3)",
                    backgroundColor: "#333",
                    transition: { duration: 0.3 },
                  }}
                >
                  <td>{character.name}</td>
                  <td>{character.height}</td>
                  <td>{character.mass}</td>
                  <td>
                    <Badge
                      color={character.hair_color}
                      style={{ color: "#000" }}
                    >
                      {character.hair_color}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      color={character.skin_color}
                      style={{ color: "#000" }}
                    >
                      {character.skin_color}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      color={character.eye_color}
                      style={{ color: "#000" }}
                    >
                      {character.eye_color}
                    </Badge>
                  </td>
                  <td>{character.birth_year}</td>
                  <td>{character.gender}</td>
                </motion.tr>
              ))}
            </tbody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default ResourceList;
