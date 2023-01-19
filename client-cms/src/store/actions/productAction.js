const baseUrl = "http://localhost:4002";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";

const setProducts = (payload) => {
  return { type: "products/fetchProduct", payload };
};

const setProductDetail = (payload) => {
  return { type: "products/fetchProductDetail", payload };
};

const setIsLoading = (payload) => {
  return { type: "isLoading/displayPreloader", payload };
};

export const fetchProduct = () => {
  return (dispatch) => {
    fetch(`${baseUrl}/products`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        if (!res.ok) throw { msg: "error" };
        return res.json();
      })
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const fetchProductDetail = (id) => {
  return (dispatch) => {
    fetch(`${baseUrl}/products/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        if (!res.ok) throw { msg: "error" };
        return res.json();
      })
      .then((data) => {
        dispatch(setProductDetail(data));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
