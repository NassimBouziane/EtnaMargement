import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Messages() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Temps de chargement de 3 secondes
  }, []);

  // Afficher un écran de chargement avec un spinner tant que isLoading est vrai
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text>Feature soon...</Text>
      )}
    </View>
  );
}
