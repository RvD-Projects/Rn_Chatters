import { View } from "react-native";
import { connect, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Input, Icon, Button } from "@rneui/base";
import { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { updateStateUser } from "../reducers/UserReducer";
import { sendNotification } from "../reducers/NotificationsReducer";

const Login = (props) => {
  const navigation = useNavigation;

  const mailRef = createRef();
  const passRef = createRef();

  const [formAsError, setFormAsError] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const emailErrorMsg = "Please enter a valid email.";
  const passErrorMsg = "Password must be at least 8 characters.";

  const user = {
    email: useSelector((state) => state.UserReducer.email),
  };

  const handleSubmit = (e) => {
    // Auto-Login or default button disabled
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
    setIsPosting(true);

    props.updateStateUser({
      email,
    });

    setTimeout(setIsPosting, 3000);

    const notification = {
      type: "success",
      message: `Well looks like you've made it work, good job ${email}.`,
      showOnScreen: true,
    };

    props.sendNotification(notification);
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

  const RenderFields = () => {
    return (
      <View>
        <Input
          ref={mailRef}
          label="Email"
          placeholder=""
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
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
          disabledInputStyle={{ background: "#ddd" }}
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
      </View>
    );
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    validateForm(null, false);
  }, [email, password]);

  const render = () => {
    return (
      <View style={{ marginVertical: "25%" }}>
        {RenderFields()}

        <Button
          loading={isPosting}
          disabled={formAsError}
          title="Login"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 8 }}
          containerStyle={{ marginTop: 24 }}
          buttonStyle={{
            alignSelf: "center",
            width: "50%",
            borderWidth: 0,
            borderRadius: 45,
          }}
          iconRight
          icon={<Icon name="login" size={24} />}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          onPress={(e) => handleSubmit(e)}
        />
      </View>
    );
  };

  return render();
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

const mapstateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  sendNotification,
  updateStateUser,
};

export default connect(mapstateToProps, mapDispatchToProps)(Login);
