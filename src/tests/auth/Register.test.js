import { mount, shallow } from "enzyme";
import React from "react";
import { RegisterScreen } from "../../pages/RegisterScreen";

import { AppProvider } from "../../context/AppContext";
import { SocketProvider } from "../../context/SocketContext";
import { ChatProvider } from "../../context/ChatContext";
import { TimerProvider } from "../../context/TimerContext";
import { MemoryRouter } from "react-router";
import { postData } from "../../helpers/postData";

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

const wrapper = mount(
  <MemoryRouter>
    <AppProvider value={appContextValue}>
      <RegisterScreen />
    </AppProvider>
  </MemoryRouter>
);

describe("Probando register", () => {
  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe hacer el registro", () => {
    wrapper.find("input[name='email']").simulate("change", {
      target: {
        name: "email",
        value: "prueba2@gmail.com",
      },
    });

    wrapper.find("input[name='password']").simulate("change", {
      target: {
        name: "password",
        value: "123456",
      },
    });

    wrapper.find("input[name='password2']").simulate("change", {
      target: {
        name: "password2",
        value: "123456",
      },
    });

    wrapper.find("input[name='name']").simulate("change", {
      target: {
        name: "name",
        value: "my test",
      },
    });

    wrapper.find("input[name='lastname']").simulate("change", {
      target: {
        name: "lastname",
        value: "testing",
      },
    });

    wrapper.find("input[name='birthday']").simulate("change", {
      target: {
        name: "birthday",
        value: "2000-10-04",
      },
    });

    wrapper.find("input[name='username']").simulate("change", {
      target: {
        name: "username",
        value: "testuser",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });

    expect(wrapper).toMatchSnapshot();
  });
});
