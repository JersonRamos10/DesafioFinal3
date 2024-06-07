'use strict';

// Definición del módulo 'myApp.navbar' que contiene el componente 'navbar'
angular.module('myApp.navbar', [])
  .component('navbar', {
    templateUrl: './components/template/navbar/navbar.html',
    controller: ['cart', '$window', function ProductosController(cart, $window) {
      var self = this;

      // Función para obtener el total del carrito
      self.getTotal = function () {
        return cart.getTotal() || 0;
      }

      // Función para obtener el contenido del carrito
      self.getCart = function () {
        return cart.getCart();
      }

      // Función para realizar el pago
      self.pagar = function () {
        var valido = true;
        if (cart.getTotal() == 0) {
          Swal.fire('¡Alerta!', 'No ha agregado ningún producto al carrito', 'warning');
          valido = false;
        }
        if (valido) {
          Swal.fire('¡Transacción exitosa!', '', 'success')
            .then(function () {
              cart.clearCart();
              $window.location.reload(); // Recargar la página
            });
        }
      }

      console.log(cart.getProductos());
    }]
  });

// Definición del módulo principal 'myApp' e inclusión del módulo 'myApp.navbar'
angular.module('myApp', ['myApp.navbar']);
