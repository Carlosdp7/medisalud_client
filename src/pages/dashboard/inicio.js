import { css } from "@emotion/react";
import * as React from "react"
import { Container, Row, Col, Table, Button, Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, navigate } from 'gatsby';
import Layout from "../../components/layout"
import { AiFillDelete, AiOutlineDownload, AiFillEdit, AiFillEye, AiOutlinePlus } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { StaticImage } from "gatsby-plugin-image"
import { UserContext } from "../../context/UserContext";
import clienteAxios from "../../axios/axios";
import { TestContext } from "../../context/TestContext";
import Moment from 'react-moment';

const Home = ({ serverData }) => {
  const { logoutUser, auth, loading, obtainUser } = React.useContext(UserContext);
  const { tests, setTestsFn, deleteTest } = React.useContext(TestContext);
  const firstTime = React.useRef(true);

  const handleLogoutUser = () => {
    logoutUser();
  }

  const handleDeleteTest = (id) => {
    deleteTest(id);
  }

  const convertMilitaryToStandardTime = (value) => {
    console.log(value);
    const [hour, minutes] = value.split(':');

    let newValue;
    if (Number(hour) >= 12) {

      const newHour = Number(hour) === 12 ? hour : hour - 12;

      newValue = `${newHour}:${minutes} pm`;

    } else {
      newValue = `${Number(hour) === 12 ? value : value.substring(1)} am`;
    }
    value = newValue;
    return value;
  }

  React.useEffect(() => {
    obtainUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!auth && !loading) {
      navigate('/dashboard/');
    }
  }, [auth, loading]);

  React.useEffect(() => {
    console.log(firstTime);
    if (tests.length === 0 && firstTime.current) {
      setTestsFn(serverData)
      firstTime.current = false;
      return
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <header css={css`position: fixed;top:0;width:100%;`}>
        <Navbar bg="light" className="py-3">
          <Container>
            <Link to="/dashboard/inicio/" className="navbar-brand">
              <StaticImage
                src="../../images/logo-medisalud.png"
                width={300}
                quality={95}
                formats={["webp"]}
                alt="Medisalud Logo"
              />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link to="/dashboard/agregar-prueba/">
                  <Button variant="primary" type="button" role="link" className="me-2">
                    <div className="d-flex align-items-center">
                      <span className="pe-1">Agregar Prueba</span> <span><AiOutlinePlus /></span>
                    </div>
                  </Button>
                </Link>
                <Button variant="danger" type="button" onClick={() => handleLogoutUser()}>
                  <div className="d-flex align-items-center">
                    <span className="pe-1">Cerrar Sesión</span> <span><FiLogOut /></span>
                  </div>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <section css={css`min-height:100vh;padding-top:10rem;`}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col xs={12} className="mb-4 text-center">
              <h1>Pruebas</h1>
            </Col>
            <Col sm={10}>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Pasaporte</th>
                    <th>Ingreso</th>
                    <th>Hora</th>
                    <th>Resultado</th>
                    <th>Estado</th>
                    <th>Gestión</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.length !== 0 ? tests.map((test, index) => (
                    <tr key={test._id}>
                      <td>{index + 1}</td>
                      <td>{test.firstname}</td>
                      <td>{test.lastname}</td>
                      <td>{test.age}</td>
                      <td>{test.gender}</td>
                      <td>{test.di}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {test.createdAt}
                        </Moment>
                      </td>
                      <td>{convertMilitaryToStandardTime(test.time)}</td>
                      <td>{test.result !== null ? test.result ? 'Positivo' : 'Negativo' : 'En espera'}</td>
                      <td>{test.result !== null ? test.isValid ? 'Vigente' : 'Vencido' : 'En espera'}</td>
                      <td css={css`font-size:20px !important;text-align:center;`}>

                        <OverlayTrigger
                          placement={'right'}
                          overlay={
                            <Tooltip>
                              Descargar QR
                            </Tooltip>
                          }
                        >
                          <a css={css`cursor: pointer;color: #000;`} disabled={!test.qrcode} href={test.qrcode} download={true} className="me-3">  <AiOutlineDownload /></a>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement={'right'}
                          overlay={
                            <Tooltip>
                              Ver Prueba
                            </Tooltip>
                          }
                        >
                          <Link to={`/dashboard/ver-prueba?id=${test._id}`} css={css`color:#000;`}><AiFillEye /></Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement={'right'}
                          overlay={
                            <Tooltip>
                              Editar Prueba
                            </Tooltip>
                          }
                        >
                          <Link to={`/dashboard/editar-prueba?id=${test._id}`} css={css`color:#000;`}><AiFillEdit className="mx-3" /></Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement={'right'}
                          overlay={
                            <Tooltip>
                              Eliminar Prueba
                            </Tooltip>
                          }
                        >
                          <span css={css`cursor: pointer;&:hover{color: #0d6efd;}`} aria-label="Delete Button" role="button" onClick={() => handleDeleteTest(test._id)} onKeyDown={() => handleDeleteTest(test._id)} tabIndex={0}><AiFillDelete /></span>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={11} className="text-center">No hay pruebas</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout >
  )
}

export default Home;

export async function getServerData() {
  try {
    const res = await clienteAxios.get('/test/obtain-tests');

    return {
      props: res.data,
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
