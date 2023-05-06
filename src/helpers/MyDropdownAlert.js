import { useEffect, useRef } from "react";
import DropdownAlert from "react-native-dropdownalert";

export const MyDropdownAlert = () => {
  let dropDownAlertRef = useRef();

  // To ensures that it overlaps other UI components
  // place it as the last component in the document tree.
  const error = async () => {
    dropDownAlertRef.alertWithType("error", "Error", "This is an error");
  };

  useEffect(() => {
    error();
  }, []);

  return (
    <DropdownAlert
      ref={(ref) => {
        if (ref) {
          dropDownAlertRef = ref;
        }
      }}
    />
  );
};
