function ProductService() {
  this.getList = function () {
    return axios({
      url: "https://63661fa8046eddf1baf95cc8.mockapi.io/Products",
      method: "GET",
    });
  };
  this.addProduct = function (data) {
    return axios({
      url: "https://63661fa8046eddf1baf95cc8.mockapi.io/Products",
      method: "POST",
      data: data,
    });
  };
  this.getById = function (id) {
    return axios({
      url: `https://63661fa8046eddf1baf95cc8.mockapi.io/Products/${id}`,
      method: "GET",
    });
  };
  this.updateProduct = function (id, data) {
    return axios({
      url: `https://63661fa8046eddf1baf95cc8.mockapi.io/Products/${id}`,
      method: "PUT",
      data: data,
    });
  };
  this.deleteProduct = function (id) {
    return axios({
      url: `https://63661fa8046eddf1baf95cc8.mockapi.io/Products/${id}`,
      method: "DELETE",
    });
  };
}
