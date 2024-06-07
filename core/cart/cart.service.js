'use strict';

angular.
  module('core.cart').
  service('cart', ['$http',function ($http) {
    let cart = {};
    let productos = [];
    let categorias = [];
    cart.list = [];

    cart.loadProductos = function () {
      return $http.get('./components/template/productos/data.json').then(function (response) {
        productos = response.data.productos;
        categorias = response.data.categorias;
        return true;
      }).catch(err => {
        console.log('Error controlado');
        console.log(err);
        return false;
      });
    };

    cart.getProductos = function (categoria, textParam) {
      return productos.filter(prod=>{ 
        return (prod.cat_id == categoria || categoria =='0') && 
               (prod.nombre.toUpperCase().includes(textParam.toUpperCase()) || prod.descripcion.toUpperCase().includes(textParam.toUpperCase()));
      });
    };

    cart.getCategorias = function () {
      return categorias;
    };

    cart.getCart = function () {
      return cart.list;
    };

    // add item in share object
    cart.add = function (prod_id) {
      const producto = productos.find(a => a.prod_id == prod_id);
      const prodInCart = cart.list.find(a => a.prod_id == prod_id);
      // Si existe se modifica la linea para sumar el subtotal
      if (prodInCart) {
        const index = cart.list.indexOf(prodInCart);
        cart.list[index] = {
          prod_id: prod_id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: prodInCart.cantidad + 1,
          subtotal: prodInCart.subtotal + producto.precio
        };
      } else {
        cart.list.push({
          prod_id: prod_id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          subtotal: producto.precio
        });
      }
    };

    cart.getTotal = function () {
      let total = 0;
      cart.list.forEach(det => {
        total += det.subtotal;
      });
      return total;
    }
    cart.clearCart = function(){
      cart.list = [];
    }
    return cart;
  }
  ]);