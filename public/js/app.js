const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";

const tablePhotographers = document.querySelector("#photographes-table__body");
const tableMedia = document.querySelector("#medias-table__body");

const addDatas = (photographers, medias) => {
  photographers.forEach(photographer => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographer;
    const fullname = name.split(" ");
    const firstname = fullname[0];
    const lastname = fullname[1];
    const tagString = tags.join(", ");
    const thumbPath = photographeThumbPath.concat(portrait);
    const thumb = `<img src="${thumbPath}" alt="Portrait de ${name}" class="thumbnail"/>`;

    const photographerMedias = medias.filter(item => item.photographerId === id);
    const titles = [];
    photographerMedias.forEach(item => {
      const title = item.title;
      titles.push(title);
    });
    const photographerMediasTitles = titles.join(", ");

    const imagesArray = [];
    photographerMedias.forEach(item => {
      const image = item.image;
      imagesArray.push(image);
    });

    const createImagesPreview = array => {
      const imagesPreview = [];
      array.forEach(image => {
        const path = mediasPath.concat("", firstname).toLowerCase().concat("/", image);
        const imageSrc = `<img class="thumb-preview" src="${path}"/>`;
        imagesPreview.push(imageSrc);
      });
      return imagesPreview.join("");
    };
    console.log(createImagesPreview(imagesArray));
    const photographerImagesPreview = createImagesPreview(imagesArray);

    const row = `<tr><td>${name}</td><td>${id}</td><td>${city}</td><td>${country}</td><td>${tagString}</td><td>${tagline}</td><td>${price}</td><td>${thumb}</td><td>${photographerImagesPreview}</td>
    </tr>`;
    tablePhotographers.insertAdjacentHTML("beforeend", row);
  });

  medias.forEach(element => {
    const { id, photographerId, title, image, tags, likes, date, price } = element;
    const tagString = tags.join(", ");

    const mediasPhotographer = photographers.filter(item => item.id === photographerId);
    const name = mediasPhotographer[0].name;

    const row = `<tr><td>${id}</td><td>${photographerId}</td><td>${name}</td><td>${title}</td><td>${image}</td><td>${tagString}</td><td>${likes}</td><td>${date}</td><td>${price}</td></tr>`;
    tableMedia.insertAdjacentHTML("beforeend", row);
  });
};

// Fetch function
const getData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return response.json();
};

// Get Datas from fetch function
getData(url)
  .then(data => {
    const { photographers, media } = data;
    addDatas(photographers, media);
  })
  .catch(error => console.log(error));
