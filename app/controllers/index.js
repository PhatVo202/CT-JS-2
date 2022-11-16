function domId(id) {
  return document.getElementById(id);
}
var productService = new ProductService();

//api danh sach
function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  var html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
    <td>${i + 1}</td>
    <td>${data[i].name}</td>
    <td>${data[i].price}</td>
    <td>${data[i].screen}</td>
    <td>${data[i].backCamera}</td>
    <td>${data[i].frontCamera}</td>
    <td>${data[i].img}</td>
    <td>${data[i].desc}</td>
    <td>${data[i].type}</td>
    <td>
      <button class="btn btn-danger" onclick="deleteProduct('${
        data[i].id
      }')">Xoá</button>
      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="openUpdateModel('${
        data[i].id
      }')" >Sửa</button>
    </td>
  </tr>`;
    domId("tblDanhSachSP").innerHTML = html;
  }
}

//Khi load vao du lieu dc cap nhat lien
window.onload = function () {
  getProductList();
};

//Hien modal bam them SP
domId("btnThemSP").onclick = function () {
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="addProduct()" class="btn btn-primary">Thêm</button>`;
};

//Them san pham
function addProduct() {
  var isValid = validateForm();
  if (!isValid) return;

  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var img = domId("HinhSP").value;
  var description = domId("MoTa").value;
  var screen = domId("ManHinh").value;
  var backCamera = domId("CameraSau").value;
  var frontCamera = domId("CameraTruoc").value;
  var type = domId("loaiSP").value;

  var products = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    description,
    type
  );

  productService.addProduct(products).then(function () {
    document.querySelector(".close").click();
    alert("Thêm sản phẩm thành công");
    getProductList();
  });
}

function openUpdateModel(id) {
  document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="updateProduct(${id})" class="btn btn-primary">Sửa</button>`;

  productService.getById(id).then(function (response) {
    domId("TenSP").value = response.data.name;
    domId("GiaSP").value = response.data.price;
    domId("ManHinh").value = response.data.screen;
    domId("CameraSau").value = response.data.backCamera;
    domId("CameraTruoc").value = response.data.frontCamera;
    domId("HinhSP").value = response.data.img;
    domId("MoTa").value = response.data.desc;

    domId("loaiSP").value = response.data.type;
  });
}

function updateProduct(id) {
  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var img = domId("HinhSP").value;
  var description = domId("MoTa").value;
  var screen = domId("ManHinh").value;
  var backCamera = domId("CameraSau").value;
  var frontCamera = domId("CameraTruoc").value;
  var type = domId("loaiSP").value;

  var products = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    description,
    type
  );

  productService.updateProduct(id, products).then(function () {
    document.querySelector(".close").click();
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
}

function deleteProduct(id) {
  productService.deleteProduct(id).then(function () {
    alert("Xoá sản phẩm thành công");
    getProductList();
  });
}

/**********VALIDATE FORM ***********/
function validateForm() {
  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var img = domId("HinhSP").value;
  var description = domId("MoTa").value;
  var screen = domId("ManHinh").value;
  var backCamera = domId("CameraSau").value;
  var frontCamera = domId("CameraTruoc").value;
  var type = domId("loaiSP").value;

  var isValid = true;

  isValid &= required(name, "txtTenSp", "*Vui lòng nhập tên sản phẩm");
  isValid &=
    required(price, "txtGiaSp", "*Vui lòng nhập giá sản phẩm") &&
    checkNumber(price, "txtGiaSp", "*Giá sản phẩm phải là số");
  isValid &= required(description, "txtDesc", "*Vui lòng nhập mô tả sản phẩm");

  isValid &= required(img, "txtImg", "*Vui lòng nhập hình ảnh sản phẩm");
  isValid &= required(
    screen,
    "txtScreen",
    "*Vui lòng nhập kích thước màn hình"
  );
  isValid &= required(img, "txtImg", "*Vui lòng nhập hình ảnh sản phẩm");

  isValid &= required(
    frontCamera,
    "txtFC",
    "*Vui lòng nhập kích thước màn Camera trước"
  );
  isValid &= required(
    backCamera,
    "txtBC",
    "*Vui lòng nhập kích thước màn Camera sau"
  );
  // isValid &= required(type, "txtType", "*Vui lòng chọn loại ");
  //neu isValid = true => dung va nguoc lai
  return isValid;
}

function required(value, spanId, alert) {
  if (value.length == "" && value.length === 0) {
    domId(spanId).innerHTML = alert;
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
}

function checkNumber(value, spanId, alert) {
  var parttern = /^[0-9]+$/;
  if (parttern.test(value)) {
    domId(spanId).innerHTML = "";
    return true;
  }
  domId(spanId).innerHTML = alert;
  return false;
}
