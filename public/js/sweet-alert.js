// Swal.fire(
//     '¡Bienvenido!',
//     'Te haz logueado exitosamente!',
//     'success'
//   );
//   console.log(uid);
//   let providerData = user.providerData;
//   //createUserDatabase (email, uid)
//   // ...
//   document.getElementById('new-email').value = "";
//   document.getElementById('new-password').value = "";
// } else {
//   // User is signed out.
//   // ...
//   Swal.fire({
//     position: 'center',
//     type: 'success',
//     title: 'Hasta luego ;)',
//     showConfirmButton: false,
//     timer: 2000
//   });
// }
// });
// }
// let deleteSweet = () => {
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: 'btn btn-success',
//           cancelButton: 'btn btn-danger'
//         },
//         buttonsStyling: false,
//       });
      
//       swalWithBootstrapButtons.fire({
//         title: 'Seguro que deseas eliminarlo?',
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Si',
//         cancelButtonText: 'No',
//         reverseButtons: true
//       }).then((result) => {
//         if (result.value) {
//           swalWithBootstrapButtons.fire(
//             'Eliminado!',
//             'Tu post se eliminó exitosamente.',
//             'success'
//           )
//         } else if (
//           // Read more about handling dismissals
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire(
//             'Cancelado',
//             'Tu post está a salvo :)',
//             'error'
//           )
//         }
//       })
// }

  