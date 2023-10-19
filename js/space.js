document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const container = document.getElementById('contenedor');

    btnBuscar.addEventListener('click', () => {
        const query = inputBuscar.value.trim();
        if(query !== '') {
            fetch(`https://images-api.nasa.gov/search?q=${query}`)
            .then  (response => {
                if(!response.ok) {
                    throw new Error('Error de red: ' + responde.status);
                }
                return response.json();
            })
            .then(data => {
                // Procesar los resultados y mostrar las imágenes en el contenedor
                container.innerHTML = ``; // Limpiar el contenedor antes de mostrar nuevos resultados
                data.collection.items.forEach(item => {
                    if(item.links && item.links[0] && item.links[0].href) {
                        const imageUrl = item.links[0].href;
                        const title = item.data[0].title || 'Titulo no disponible';
                        const description = item.data[0].description || 'Descripcion no disponible';
                        const date = item.data[0].date_created || 'Fecha no disponible';
                        
                        // Crear elementos para mostrar la imagen e informacion
                        const imgElement = document.createElement('img');
                        imgElement.src = imageUrl;

                        const titleElement = document.createElement('h1');
                        titleElement.textContent = title;

                        const descriptionElement = document.createElement('p');
                        descriptionElement.textContent = description;

                        const dateElement = document.createElement('p');
                        dateElement.textContent = "Fecha: " + date;

                        //Crear un contenedor para cada imagen y su informacion
                        const imageContainer = document.createElement('div');
                        imageContainer.appendChild(imgElement);
                        imageContainer.appendChild(titleElement);
                        imageContainer.appendChild(descriptionElement);
                        imageContainer.appendChild(dateElement);

                        container.appendChild(imageContainer);
                    }
                });
            })
            .catch(error => {
                console.error("Error", error);
            });
            }
        });
      });
        