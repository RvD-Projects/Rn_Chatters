import { APP_NAME } from "@env";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { setError } from "../reducers/ScreenNotificationReducer";

const Home = (props) => {
  const error = {
    type: "info",
    isOpen: true,
    msg: "Well looks like you've made it work, good job.",
    useNotifications: true,
  };

  props.setError(error);

  return (
    <View>
      <Text>{APP_NAME}: This is the home view</Text>
    </View>
  );
};

const mapDispatchToProps = {
  setError
};

export default connect(null, mapDispatchToProps)(Home);
