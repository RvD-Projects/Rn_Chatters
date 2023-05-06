import { APP_NAME } from "@env";
import { Text, View } from "react-native";
import { setError } from "../actions/screenNotification";
import { connect } from "react-redux";


const Home = (props) => {
    const error = {
        type: 'info',
        isOpen: true,
        msg: "Well looks like you've made it work, good job.",
        useNotifications: true
      };

      props.setError(error);

    
    return (
        <View>
            <Text>{APP_NAME}</Text>
        </View>
        
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      setError: (error) => dispatch(setError(error)),
    }
  }

export default connect(null, mapDispatchToProps)(Home)
