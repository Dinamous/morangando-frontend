import axios from "axios";

const API_URL = "https://morangandoapi.herokuapp.com/funcionarios/";

class AuthService {
  login(username, senha) {
    return axios
      .post(API_URL + "login", {
        username,
        senha,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, status, senha) {
    return axios.post(API_URL + "cadastro", {
      username,
      status,
      senha,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
