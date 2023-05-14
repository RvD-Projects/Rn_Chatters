import React from "react";
import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "../helpers/notifications/AlertHelper";

const AppScreenNotification = (props) => {
  return (
    <DropdownAlert
      showCancel={true}
      closeInterval={8000}
      messageNumOfLines={8}
      ref={(ref) => AlertHelper.setDropDown(ref)}
      onClose={() => AlertHelper.invokeOnClose()}
    />
  );
};

export default AppScreenNotification;
