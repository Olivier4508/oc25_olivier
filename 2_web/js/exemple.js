// console.log('bonjour');

// var message = "bienvenue";

// console.log(message);

/// function ma_fonction() {
//     console.log('ma_fonction');
// }

// ma_fonction(); 

// for (var i = 0; i < 10; i++) {
//    console.log(i);
// }

// console.log(document.querySelector('a'))

// console.log(document.querySelector('.important').textContent)

// console.log(document.getElementById('.important'))

// function ajouter_perso() {
//    var nom_perso = 'Jean';
//    var nouveau_li = document.createElement('li');
//    var nouveau_text = document.createTextNode(text_personnage);

//    console.log(nom_perso);
// }

// var jean = {
//     nom: 'jean',
//     classe: 'guerrier',
//     niveau: 2,
//     passer_niveau: function () {
//         this.niveau++;
//     },
    
// };

// console.log(jean.niveau)
// jean.passer_niveau();
// console.log(jean.niveau)

// for (var i = 0; i < troupe.length; i++) {
//     var li_personnage = document.createElement('li');
//     var texte_personnage = document.createTextNode(troupe[i].nom);
//     li_personnage.appendChild(texte_personnage);
//     var liste_perso = document.getElementById('liste_perso');
//     liste_perso.appendChild(li_personnage);
// }

function creer_personnage(nom, classe, niveau) {
    var nouveau_personnage = {
        nom: nom,
        classe: classe,
        niveau: niveau,
        passer_niveau: function () {
            this.niveau++;
        },
        creer_li: function() {
        var li_personnage = document.createElement('li');
        var texte_personnage = document.createTextNode(
            this.nom + ' (' + this.classe + ', niveau ' + this.niveau + ')'
        );
        li_personnage.appendChild(texte_personnage);
        li_personnage.setAttribute('class', this.classe);
        return li_personnage;
    }
    };
    return nouveau_personnage
};

var troupe = [
    creer_personnage('jean', 'guerrier', 2),
    creer_personnage('nicole', 'voleur', 1),
    creer_personnage('matteo', 'magicien', 4)
];

for (var i = 0; i < troupe.length; i++) {
    var perso = troupe[i];
    li_personnage = perso.creer_li();
    var liste_perso = document.getElementById('liste_perso');
    liste_perso.appendChild(li_personnage);
};