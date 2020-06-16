import JtockAuth from "j-tockauth";

let jtockURL;
if (process.env.NODE_ENV === "production") {
  jtockURL = process.env.REACT_APP_HEROKUURL;
} else if (process.env.NODE_ENV === "development") {
  jtockURL = "http://localhost:3000/api";
}

const auth = new JtockAuth({
  host: jtockURL,
  debug: false,
});

const persistLogin = async (setAuthenticated, setUid) => {
  if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
    const tokenParams = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      const response = await auth.validateToken(tokenParams);
      setAuthenticated(response.success);
      setUid(response.data.uid);
    } catch (error) {
      console.log(error);
    }
  }
};

export { auth, persistLogin };
