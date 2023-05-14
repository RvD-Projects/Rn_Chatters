import { APP_NAME } from "@env";
import { Text, View } from "react-native";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <View>
      <Text>{APP_NAME}: This is the home view</Text>
    </View>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Home);
