import { View } from "react-native";
import { connect } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Input, Icon, Button, Text } from "@rneui/themed";
import { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { updateStateUser } from "../../reducers/UserReducer";
import { sendNotification } from "../../reducers/NotificationsReducer";
import { getLoader } from "../../helpers";
import { getObject } from "../../helpers/Storages/AsyncStoreHelper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../styles/theme";

const Login = (props) => {
  const navigation = useNavigation();

  const mailRef = createRef();
  const passRef = createRef();
  const isFocused = useIsFocused();

  const [formAsError, setFormAsError] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const emailErrorMsg = "Please enter a valid email.";
  const passErrorMsg = "Password must be at least 8 characters.";

  const init = async () => {
    const user = await getObject("user");
    setEmail(user?.email);
    setIsReady(true);
  };

  const handleSubmit = (e) => {
    // Auto-Login and default button disabled
    if (!e) {
      return;
    }

    const notValid = validateForm(e, true);
    if (notValid) {
      return;
    }

    // hanlde-post
    doLogin();
  };

  const doLogin = async () => {
    props.updateStateUser({ email });
    setisProcessing(true);

    props.sendNotification({
      title: "Login request",
      type: "socket-request",
      message: `${email}`,
      showOnScreen: false,
    });

    // response-mock
    setTimeout(() => {
      props.sendNotification({
        title: "Login response",
        type: "socket-response",
        message: `${email}`,
        showOnScreen: false,
      });
      setisProcessing(false);
      navigation.navigate("HomeDrawer");
    }, 3000);
  };

  const validateEmail = (value, showError = false) => {
    setEmailMsg("");
    let asError = false;

    if (!isEmail(value ?? "")) {
      showError && mailRef.current.shake();
      showError && setEmailMsg(emailErrorMsg);
      asError = true;
    }

    return asError;
  };

  const validatePassword = (value, showError = false) => {
    setPasswordMsg("");
    let asError = false;

    if (value?.length < 8) {
      showError && passRef.current.shake();
      showError && setPasswordMsg(passErrorMsg);
      asError = true;
    }

    return asError;
  };

  const validateForm = (e, showError = false) => {
    const asError =
      validateEmail(email, showError) || validatePassword(password, showError);
    setFormAsError(asError);
    return asError;
  };

  const RenderLoginForm = () => {
    return (
      <View>
        <Input
          ref={mailRef}
          value={email?.toLowerCase()}
          label="Email"
          placeholder=""
          containerStyle={{}}
          inputContainerStyle={{}}
          inputStyle={{}}
          labelStyle={{}}
          labelProps={{}}
          rightIconContainerStyle={{}}
          rightIcon={<Icon type="font-awesome" name="at" size={20} />}
          errorProps={{}}
          errorStyle={{ color: "red" }}
          errorMessage={emailMsg}
          secureTextEntry={false}
          onChangeText={(value) => setEmail(value)}
        />

        <Input
          ref={passRef}
          label="Password"
          placeholder=""
          containerStyle={{}}
          inputContainerStyle={{}}
          inputStyle={{}}
          labelStyle={{}}
          labelProps={{}}
          rightIconContainerStyle={{}}
          rightIcon={<Icon type="font-awesome" name="lock" size={20} />}
          errorProps={{}}
          errorStyle={{ color: "red" }}
          errorMessage={passwordMsg}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />

        <Button
          loading={isProcessing}
          disabled={formAsError}
          title="Login"
          titleStyle={{ marginHorizontal: 8 }}
          containerStyle={{ marginVertical: 12 }}
          buttonStyle={{
            alignSelf: "center",
            width: "75%",
            borderWidth: 0,
            borderRadius: 45,
            backgroundColor: Colors.primary,
          }}
          disabledStyle={{
            backgroundColor: Colors.disabled,
          }}
          iconRight
          icon={<Icon name="login" size={24} color={Colors.white} />}
          onPress={(e) => handleSubmit(e)}
        />
      </View>
    );
  };

  const RenderSubContent = () => {
    return (
      <View
        style={{
          marginVertical: 12,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: Colors.primary }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      init();
      handleSubmit();
    }
  }, [isFocused]);

  useEffect(() => {
    validateForm(null, false);
  }, [email, password]);

  const render = () => {
    if (!isReady) {
      return getLoader();
    }

    return (
      <View style={{ marginVertical: "25%" }}>
        {RenderLoginForm()}
        {RenderSubContent()}
      </View>
    );
  };

  return render();
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

const mapDispatchToProps = {
  sendNotification,
  updateStateUser,
};

export default connect(null, mapDispatchToProps)(Login);
