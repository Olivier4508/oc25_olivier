const statut = document.querySelector('.statut');
const ctx_statut = statut.getContext('2d');

ctx_statut.fillStyle = 'green';
ctx_statut.fillRect(0, 0, 300, 300);

const dessin = document.querySelector('.dessin');
const ctx_dessin = dessin.getContext('2d');


// ctx_dessin.fillStyle = 'red';
// ctx_dessin.fillRect(0, 0, 500, 500);

// ctx_dessin.fillStyle = 'white';
// ctx_dessin.fillRect(100, 200, 300, 100);
// ctx_dessin.fillRect(200, 100, 100, 300);


// for (var x = 0; x < 500; x += 20) {
//     for (var y = 0; y < 500; y += 20) {
//         if (y % 40 === 0) {
//              ctx_dessin.fillStyle = 'black'
//             ctx_dessin.fillRect(x, y, 20, 20)
//         }
//         else {
//             ctx_dessin.fillStyle = 'white'
//             ctx_dessin.fillRect(x, y, 20, 20)
//         }
//     }
// }

for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
        if ((i + j) % 2 == 0) {
            ctx_dessin.fillStyle = 'black';
        } else {
            ctx_dessin.fillStyle = 'white';
        }

        ctx_dessin.fillRect(100*x, 100*y, 100, 100)
    }
}