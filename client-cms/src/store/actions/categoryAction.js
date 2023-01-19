const baseUrl = "http://localhost:4002";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";

const setCategories = (payload) => {
  return { type: "categories/fetchCategory", payload };
};
const setCategoryDetail = (payload) => {
  return { type: "categories/fetchCategoryDetail", payload };
};

const setIsLoading = (payload) => {
  return { type: "isLoading/displayPreloader", payload };
};

export const fetchCategory = () => {
  return (dispatch) => {
    fetch(`${baseUrl}/categories`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        if (!res.ok) throw { msg: "error" };
        return res.json();
      })
      .then((data) => dispatch(setCategories(data)))
      .catch((err) => console.log(err.message))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const fetchCategoryDetail = (id) => {
  // console.log("dari fetchCategoryDetail - action; id =", id);
  console.log(id);
  return (dispatch) => {
    fetch(`${baseUrl}/categories/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        if (!res.ok) throw { msg: "error" };
        return res.json();
      })
      .then((data) => {
        // console.log("data dari fetchCategoryDetail", data);
        return dispatch(setCategoryDetail(data));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
