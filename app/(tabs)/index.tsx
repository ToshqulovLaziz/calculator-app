import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (value === "AC") {
      setDisplay("0");
      setOperator(null);
      setFirstValue(null);
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
      setFirstValue(display);
      setDisplay("0");
      return;
    }

    if (value === "=") {
      if (operator && firstValue) {
        const result = eval(`${firstValue} ${operator} ${display}`);
        setDisplay(String(result));
        setOperator(null);
        setFirstValue(null);
      }
      return;
    }

    if (value === ".") {
      if (display.includes(".")) {
        return; 
      }
    }

    setDisplay((prev) =>
      prev === "0" && value !== "." ? value : prev + value
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{display}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.acButton}
            onPress={() => handlePress("AC")}
          >
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sleshButton}
            onPress={() => handlePress("/")}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {[
            "7",
            "8",
            "9",
            "*",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "+",
            "0",
            ".",
            "=",
          ].map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.button,
                key === "0" ? styles.zeroButton : null,
                !isNaN(Number(key)) && key !== "0"
                  ? styles.numberButton
                  : styles.operatorButton,
                key === "=" ? styles.equalsButton : null,
              ]}
              onPress={() => handlePress(key)}
            >
              <Text style={styles.buttonText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "#000",
  },

  display: {
    width: "100%",
    height: 100,
    backgroundColor: "maroon",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
    borderRadius: 5,
  },
  displayText: {
    fontSize: 48,
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 19,
    justifyContent: "space-between",
  },
  grid: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "20%",
    height: 70,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  numberButton: {
    backgroundColor: "gray",
  },
  zeroButton: {
    backgroundColor: "green",
    width: "42%",
    height: 70,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  operatorButton: {
    backgroundColor: "green",
  },
  equalsButton: {
    backgroundColor: "green",
  },
  acButton: {
    backgroundColor: "red",
    width: "20%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  sleshButton: {
    backgroundColor: "green",
    width: "20%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
});

export default Calculator;
