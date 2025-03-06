document.addEventListener("DOMContentLoaded", function() {
    // Atualiza o ano no rodapé
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Formulário de Contato
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio real do formulário
            formMessage.classList.remove("hidden"); // Exibe a mensagem de sucesso
            formMessage.textContent = "Your message has been sent successfully!";
            formMessage.style.color = "green";
            contactForm.reset(); // Limpa os campos do formulário
        });
    }
    
    // Carregar informações das filiais do XML
    fetch("branches.xml")
        .then(response => response.text())
        .then(xmlText => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlText, "text/xml");
            let branches = xml.getElementsByTagName("branch");
            let branchContainer = document.getElementById("branch-container");
            if (branchContainer) {
                branchContainer.innerHTML = "";

                for (let branch of branches) {
                    let name = branch.getElementsByTagName("name")[0].textContent;
                    let address = branch.getElementsByTagName("address")[0].textContent;
                    let phone = branch.getElementsByTagName("phone")[0].textContent;
                    let hours = branch.getElementsByTagName("hours")[0].textContent;
                    let map = branch.getElementsByTagName("map")[0].textContent;
                    
                    let branchHTML = `
                        <div class="branch fade-in">
                            <h4>${name}</h4>
                            <p><strong>Address:</strong> ${address}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Hours:</strong> ${hours}</p>
                            <p><a href="${map}" target="_blank">View on Google Maps</a></p>
                        </div>
                    `;
                    
                    branchContainer.innerHTML += branchHTML;
                }
            }
        })
        .catch(error => console.error("Error loading branches:", error));

    // Carregar itens do menu do XML
    fetch("menu.xml")
        .then(response => {
            console.log("Status da resposta:", response.status);
            return response.text();
        })
        .then(xmlText => {
            console.log("XML recebido:", xmlText);
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlText, "text/xml");
            let items = xml.getElementsByTagName("item");
            let menuContainer = document.querySelector(".menu-items");
            
            console.log("Número de itens encontrados:", items.length);
            
            if (menuContainer) {
                menuContainer.innerHTML = "";

                for (let item of items) {
                    let category = item.getAttribute("category");
                    let name = item.getElementsByTagName("name")[0].textContent;
                    let descriptionElement = item.getElementsByTagName("description");
                    let description = descriptionElement.length > 0 ? descriptionElement[0].textContent : "";
                    let price = item.getElementsByTagName("price")[0].textContent;
                    let image = item.getElementsByTagName("image")[0].textContent;

                    let itemHTML = `
                        <div class="item" data-category="${category}">
                            <img src="${image}" alt="${name}">
                            <h3>${name}</h3>
                            <p>${description}</p>
                            <span>${price}</span>
                        </div>
                    `;
                    menuContainer.innerHTML += itemHTML;
                }
            } else {
                console.error("Container do menu não encontrado");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar menu:", error);
        });
});
