import { Toast } from 'native-base'

export const toastr = {
    showToast: (message, duration = 3500) => {
      Toast.show({
        text: message,
        duration,
        position: 'bottom',
        textStyle: { textAlign: 'center' },
        buttonText: "Okay",
        buttonTextStyle: { color: "#008000" },
        buttonStyle: { backgroundColor: "#5cb85c" },
        type: "danger"
      });
    },
  };