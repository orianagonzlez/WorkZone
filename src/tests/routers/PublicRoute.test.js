import { mount } from "enzyme";
import { PublicRoute } from "../../router/PublicRoute";
import { MemoryRouter } from "react-router";
import React from "react";
import { AppProvider } from "../../context/AppContext";
import { SocketProvider } from "../../context/SocketContext";
import { ChatProvider } from "../../context/ChatContext";
import { TimerProvider } from "../../context/TimerContext";

describe("Pruebas en el componente de rutas privadas", () => {
  test("Se debe mostrar el componente si isLogeed", () => {
    /*shallow renderiza el componente saltadose por decirlo asi
    el ciclo de vida del componente , al que se hacia referencia en 
    react con clases didmount y didupdate*/

    /*
     * MemoryRouter es un high order component de react-router-dom especializado para pruebas
     * puesto que  private route debe estar envuelto en la etiqueta Route
     */

    const appContextValue = {
      setUser: jest.fn(),
      user: {
        email: "prueba@gmail.com",
        id: "12345678",
        nombre: "prueba myTest",
        isLogged: true,
        token: "drftyvubndkds31321wepjfjduei",
        checking: false,
      },
    };

    const chatContextValue = {
      chat: {
        activeChat: "",
        projects: [],
        messages: [],
        notification: "",
        project: "",
      },
      dispatch: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter>
        <ChatProvider value={chatContextValue}>
          <AppProvider value={appContextValue}>
            <SocketProvider>
              <TimerProvider>
                <PublicRoute
                  isAuthenticated={false}
                  //Se le pasa un componente que es que rederizaria la ruta por eso se pasa en forma de callback
                  component={() => <span id="test">Hay fé</span>}
                />
              </TimerProvider>
            </SocketProvider>
          </AppProvider>
        </ChatProvider>
      </MemoryRouter>
    );

    console.log(wrapper.html());
    expect(wrapper.find("#test").exists()).toBe(true);
  });
});
