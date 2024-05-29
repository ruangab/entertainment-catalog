var base_url = "http://127.0.0.1:19980";

function ver_mais(element, count_id){
    $.ajax({
        url: base_url + `/filmes/filtrar-filme?nome=${element}`,
        method: "GET",
        success: function(response) {
            $(`#sinopse_filme_${count_id}`).text("");
            $(`#sinopse_filme_${count_id}`).append(response.data.overview + `<button type="button" class="btn btn-link btn-sm" onclick="ver_menos('${response.data.original_title}', '${count_id}')"> Ver menos</button>`);
        },
        error: function(xhr, status, error) {
            // Se o login falhar, exiba uma mensagem de erro para o usuário
            alert("Erro ao mostrar a sinopse.");
        }
    });
}

function ver_menos(element, count_id){
    let sinopse = $(`#sinopse_filme_${count_id}`).text();
    if (sinopse.length > 250){
        let element_tratado = sinopse.substr(0,250) + "...";
        element_tratado += `<button type="button" class="btn btn-link btn-sm"  onclick="ver_mais('${element}', '${count_id}')"> Ver mais</button>`
        $(`#sinopse_filme_${count_id}`).text("");
        $(`#sinopse_filme_${count_id}`).append(element_tratado);
    }
}

function limit_caracteres(element, count_id){
    let element_text = element["overview"];
    let element_name = element["original_title"];
    if (element_text.length > 250){
        let element_tratado = element_text.substr(0,250) + "...";
        element_tratado += `<button type="button" class="btn btn-link btn-sm" onclick="ver_mais('${element_name}', '${count_id}')"> Ver mais</button>`;
        return element_tratado;
    }
    return element_text;
}

/////
//
// Title: Fullscreen Menu with jQuery and Flexbox
// Author: Steven Roberts
//
/////

// Functions

function openMenu() {
    $('.js-menu-container').addClass('is-open'); // Find element with the class 'js-menu-container' and apply an additional class of 'is-open'
}


function closeMenu() {
    $('.js-menu-container').removeClass('is-open'); // Find element with the class 'js-menu-container' and remove the class 'is-open'
}

// Document Ready

jQuery(document).ready(function($){ // When everything has finished loading

    $('.js-menu-button').click(function(){ // When the element with the class 'js-menu-button' is clicked
        openMenu(); // Run the openMenu function
    });

    $('.js-menu-close').click(function(){ // When the element with the class 'js-menu-close' is clicked
        closeMenu(); // Run the closeMenu function
    });

});

// Keyboard Accessibility

jQuery(document).keyup(function(e) { // Listen for keyboard presses

    if (e.keyCode === 27) { // 'Esc' key

        if ($('.js-menu-container').hasClass('is-open')) { // If the menu is open close it
            closeMenu(); // Run the closeMenu function
        }

    }

});


$(document).ready(function() {
    let filmes = $("#card_filmes");

    $.ajax({
        url: base_url + "/filmes",
        method: "GET",
        success: function(response) {
            let lista_filmes = response.data;
            let count_id = 1;
            lista_filmes.forEach(function(elemento){
                let texto_filme = `
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title" id="nome_filme">${elemento["original_title"]}</h5>
                        <p class="card-text" id="sinopse_filme_${count_id}">${limit_caracteres(elemento, count_id)}</p>
                        <p class="card-text"><small class="text-muted"><button type="button" class="btn btn-primary">Primary</button></small></p>
                    </div>
                    </div>
                </div>
                `;
                count_id += 1;
                filmes.append(texto_filme)
            });
            
        },
        error: function(xhr, status, error) {
            // Se o login falhar, exiba uma mensagem de erro para o usuário
            alert("Usuário ou senha incorretos. Por favor, tente novamente.");
        }
    });
});