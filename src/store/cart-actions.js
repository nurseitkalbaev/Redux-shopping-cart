import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-shopping-cart-6ae45-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request To Fetch Data Failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      // Send state as Sendign request

      const res = await fetch(
        "https://redux-shopping-cart-6ae45-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // Send state as Request is succsessful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to Database Successfully",
          type: "success",
        })
      );
      return data;
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};
