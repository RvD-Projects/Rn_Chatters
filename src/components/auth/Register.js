import { View } from "react-native";
import React, { createRef, useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { Colors } from "../../styles/theme";
import isEmail from "validator/lib/isEmail";
import PropTypes from "prop-types";
import DatePicker from "react-native-date-picker";
import { sendNotification } from "../../reducers/NotificationsReducer";
import { updateStateUser } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Register = (props) => {
	const navigation = useNavigation();
  const mailRef = createRef();
  const passRef = createRef();
  const confirmPassRef = createRef();
  const nameRef = createRef();
  const lastnameRef = createRef();
  const dobRef = createRef();

  const [formAsError, setFormAsError] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState(" ");

  const [emailMsg, setEmailMsg] = useState("");
  const [namelMsg, setNameMsg] = useState("");
  const [dobMsg, setDobMsg] = useState("");
  const [lastnameMsg, setLastnameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmPasswordMsg, setcconfirmPasswordMsg] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const emailErrorMsg = "Please enter a valid email.";
  const dobErrorMsg = "Please enter a valid date.";
  const isEmptyErrorMsg = "Please fill up the field.";
  const passErrorMsg = "Password must be at least 8 characters.";
  const passConfirmErrorMsg = "Passwords don't match.";

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
    doRegister();
  };

  const doRegister = async () => {
    props.updateStateUser({ email });
    setisProcessing(true);

    props.sendNotification({
      title: "Register request",
      type: "socket-request",
      message: `${email}`,
      showOnScreen: false,
    });

    // response-mock
    setTimeout(() => {
      props.sendNotification({
        title: "Register response",
        type: "socket-response",
        message: `${email}`,
        showOnScreen: false,
      });
      setisProcessing(false);
      navigation.navigate("Login");
    }, 3000);
  };

  const validateNames = (name, lastname, showError = false) => {
    setNameMsg("");
    setLastnameMsg("");
    let asError = false;

    if (name?.length < 1) {
      showError && nameRef.current.shake();
      showError && setNameMsg(isEmptyErrorMsg);
      asError = true;
    }

    if (lastname?.length < 1) {
      showError && lastnameRef.current.shake();
      showError && setLastnameMsg(isEmptyErrorMsg);
      asError = true;
    }

    return asError;
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

  const validateDob = (value, showError = false) => {
    setDobMsg("");
    let asError = false;

    if (!Date.parse(value ?? "") > 0) {
      showError && dobRef.current.shake();
      showError && setDobMsg(dobErrorMsg);
      asError = true;
    }

    return asError;
  };

  const validateBothPasswords = (
    baseValue,
    confirmValue,
    showError = false
  ) => {
    setPasswordMsg("");
    setcconfirmPasswordMsg("");

    if (baseValue?.length < 8) {
      showError && passRef.current.shake();
      showError && setPasswordMsg(passErrorMsg);
      return true;
    }

    if (confirmValue?.length < 8) {
      showError && confirmPassRef.current.shake();
      showError && setcconfirmPasswordMsg(passErrorMsg);
      return true;
    }

    if (baseValue !== confirmValue) {
      showError && confirmPassRef.current.shake();
      showError && setcconfirmPasswordMsg(passConfirmErrorMsg);
      return true;
    }
  };

  const validateForm = (e, showError = false) => {
    const asError =
      validateNames(name, lastname, showError) |
      validateEmail(email, showError) |
      validateDob(dob, showError) |
      validateBothPasswords(password, confirmPassword, showError);
    setFormAsError(asError);
    return asError;
  };

  const RenderForm = () => {
    return (
      <View>
        <Input
          ref={nameRef}
          value={nameRef}
          label="Firstname"
          rightIcon={<Icon type="font-awesome" name="user" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={namelMsg}
          secureTextEntry={false}
          onChangeText={(value) => setName(value)}
        />

        <Input
          ref={lastnameRef}
          value={lastname?.toLowerCase()}
          label="Lastname"
          rightIcon={<Icon type="font-awesome" name="user" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={lastnameMsg}
          secureTextEntry={false}
          onChangeText={(value) => setLastName(value)}
        />

        <Input
          ref={dobRef}
          value={dob}
          showSoftInputOnFocus={false}
          onPressIn={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          label="Date of birth"
          rightIcon={<Icon type="font-awesome" name="calendar" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={dobMsg}
        />

        <DatePicker
          modal
          mode={"date"}
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDob(date.toLocaleDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Input
          ref={mailRef}
          value={email?.toLowerCase()}
          label="Email"
          rightIcon={<Icon type="font-awesome" name="at" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={emailMsg}
          secureTextEntry={false}
          onChangeText={(value) => setEmail(value)}
        />

        <Input
          ref={passRef}
          label="Password"
          rightIcon={<Icon type="font-awesome" name="lock" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={passwordMsg}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />

        <Input
          ref={confirmPassRef}
          label="Confirm Password"
          rightIcon={<Icon type="font-awesome" name="lock" size={20} />}
          errorStyle={{ color: "red" }}
          errorMessage={confirmPasswordMsg}
          secureTextEntry={true}
          onChangeText={(value) => setConfirmPassword(value)}
        />

        <Button
          loading={isProcessing}
          title="Register"
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
          icon={<Icon name="save" size={24} color={Colors.white} />}
          onPress={(e) => handleSubmit(e)}
        />
      </View>
    );
  };

  return <View style={{ marginVertical: "25%" }}>{RenderForm()}</View>;
};

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  name: PropTypes.string,
  lastname: PropTypes.string,
  dob: PropTypes.string,
};

const mapDispatchToProps = {
  sendNotification,
  updateStateUser,
};

export default connect(null, mapDispatchToProps)(Register);
