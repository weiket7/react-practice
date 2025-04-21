import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  FlatList, //render visible elements, others loaded and rendered lazily
} from "react-native";
import { useState } from "react";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [goalsList, setGoalsList] = useState([]);

  function addGoal(goal) {
    //setGoalsList([...goalsList, goal]); //not good if new state depends on previous state
    setGoalsList((currentGoalsList) => [
      ...currentGoalsList,
      { text: goal, id: Math.random().toString() },
    ]);
    closeModal();
  }

  function deleteGoal(id) {
    console.log("delete " + id);
    setGoalsList((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <StatusBar style="light"></StatusBar>
      <View style={styles.container}>
        <Button title="Add New Goal" color="#5e0acc" onPress={openModal} />
        <GoalInput
          onAddGoal={addGoal}
          showModal={showModal}
          closeModal={closeModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goalsList}
            keyExtractor={(item, index) => item.id}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDelete={deleteGoal}
              ></GoalItem>
            )}
          />
          {/* <ScrollView>
          {goalsList.map((goal) => (
            <View key={goal} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //outer container take full height
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
