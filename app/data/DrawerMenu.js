import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";

import { onSignOut } from "../config/auth";
import { NavigationActions } from "react-navigation";

class DrawerMenu extends Component {
  _navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: `${route}` })]
      })
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("HomeScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("PersonalProfileScreen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Perfil Pessoal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
        >
          <Text style={styles.menuItemText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.get('window').width * 0.15,
    backgroundColor: '#F8F9FE',
  },
  menuItem: {
    padding: 10,
    justifyContent: 'center',
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 24,
    color: '#323BEA',
    fontWeight: 'normal'
  }
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;