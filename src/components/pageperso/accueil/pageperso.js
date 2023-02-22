import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pageperso.css";

function PagePerso() {
  const navigate = useNavigate();
  //on crée un tableau vide pour stocker les données du back end
  const [posts, setPosts] = useState([]);

  //on va récupérer la donnée grâce au fetch
  const getPosts = async () => {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/posts",
      options
    )
      .then((response) => {
        return response.json();
      })
      //on envoie les données du back dans la variable d'état
      .then((response) => {
        setPosts(response.posts);
      });
  };

  //au clic sur "nouvelle publication", on est redirigé vers la page "postCreation"
  const createPost = () => {
    if (localStorage.getItem("@userToken")) {
      navigate("/postCreation");
    } else {
      alert("Vous devez être connecté pour poster de nouvelles publications");
    }
  };
  //on définit la fonction du bouton "j'aime"
  const addLike = async () => {
    const postId = posts.map((element, index) => {
      return element._id[index];
    });

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/post/like",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
      });
  };
  //on affiche le contenu de posts grâce au .map
  const renderPosts = () => {
    return posts.map((item, index) => {
      return (
        <div key={index} className="postRender">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <p>Likes:{posts.likes} </p>
          <button onClick={addLike}>J'aime</button>
          <button>Ajouter un commentaire</button>
        </div>
      );
    });
  };

  //on récupère le contenu du back grâce à la fonction getPost
  useEffect(() => {
    getPosts();
  }, []);
  //on actualise l'affichage du console.log chaque fois que le tableau change
  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);
  return (
    <div className="postRender">
      <h1>Mes publications</h1>
      {renderPosts()}
      <button onClick={createPost}>Nouvelle publication</button>
    </div>
  );
}

export default PagePerso;
