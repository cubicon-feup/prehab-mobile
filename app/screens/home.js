import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { onSignOut } from "../auth";

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card title="Acilio Silva">
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>AC</Text>
      </View>
      <Button
        backgroundColor="#03A9F4"
        title="Terminar Sessão"
        onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
      />
    </Card>
  </View>
);