const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";

const setImages = (payload) => {
  return { type: "images/fetchImage", payload };
};

const setIsLoading = (payload) => {
  return { type: "isLoading/displayPreloader", payload };
};

export const fetchImage = () => {
  return (dispatch) => {
    fetch(`${baseUrl}/images`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        if (!res.ok) throw { msg: "error" };
        return res.json();
      })
      .then((data) => dispatch(setImages(data)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
