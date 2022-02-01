import { css } from "@emotion/react";
import * as React from "react"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Layout from "../../components/layout"
import { StaticImage } from "gatsby-plugin-image";
import Swal from 'sweetalert2';
import { UserContext } from "../../context/UserContext";
import { navigate } from 'gatsby';

const Login = () => {
  const { signIn, auth } = React.useContext(UserContext);
  const [formdata, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const { email, password } = formdata;

  const readFormData = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const sendData = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios.',
        confirmButtonColor: '#0b5ed7'
      })
      return;
    }

    signIn(email, password);
  }

  React.useEffect(() => {
    if (auth) {
      navigate('/dashboard/inicio/');
    }
  }, [auth]);

  return (
    <Layout>
      <section css={css`height:100vh;`}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6} xl={4}>
              <div className="text-center mb-4">
                <StaticImage
                  src="../../images/logo-medisalud.png"
                  width={300}
                  quality={95}
                  formats={["webp"]}
                  alt="Medisalud Logo"
                />
              </div>
              <Form noValidate onSubmit={sendData}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" name="email" value={email} onChange={readFormData} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" value={password} onChange={readFormData} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Iniciar Sesión
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default Login
