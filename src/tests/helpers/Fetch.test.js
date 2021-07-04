import { getData } from "../../helpers/getData";
import { postData } from "../../helpers/postData";

describe("Pruebas a los helpers que hacen fetch con la api", () => {
  test("fetch POST debe de dar respuesta ok true", async () => {
    const response = await postData(
      "https://workzone-backend-mdb.herokuapp.com/api/auth/login",
      {
        email: "test@gmail.com",
        contrasena: "123456",
      }
    );

    console.log(response);
    expect(response.ok).toBe(true);
  });
  //---------------------------------------------------------------------------------
  test("fetch GET debe de dar respuesta ok true", async () => {
    const response = await getData(
      "https://workzone-backend-mdb.herokuapp.com/api/auth/60e1dd0c3356280015235c6b"
    );

    console.log(response);
    expect(response.ok).toBe(true);
  });
});
