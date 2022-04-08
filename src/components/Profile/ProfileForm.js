import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //Agregar vaidacion

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCPBk9cSyMaUUCN0c_br20XGocE7oGowfQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': "Bearer xyz_token_xyz" // Depende del api
        },
      }
    ).then(async (res) => {
      // Asumiremos que siemore es exitosa.
      const data = await res.json();
      console.log("Response - cambiar contraseña: ", data);
      return data;
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">Nueva contraseña</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Cambiar Contraseña</button>
      </div>
    </form>
  );
};

export default ProfileForm;
