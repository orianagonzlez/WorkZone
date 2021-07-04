import { mount, shallow } from "enzyme";
import React from "react";
import { LoginScreen } from "../../pages/LoginScreen";

import { AppProvider } from "../../context/AppContext";
import { SocketProvider } from "../../context/SocketContext";
import { ChatProvider } from "../../context/ChatContext";
import { TimerProvider } from "../../context/TimerContext";
import { MemoryRouter } from "react-router";

describe("Probando login", () => {
  test("Debe mostrarse correctamente", () => {
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
        <AppProvider value={appContextValue}>
          <TimerProvider>
            <LoginScreen />
          </TimerProvider>
        </AppProvider>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
