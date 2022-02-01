import * as React from "react"
import { Link, navigate } from 'gatsby';
import { css } from "@emotion/react";
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';
import { AiOutlineDownload } from 'react-icons/ai';
import { UserContext } from "../context/UserContext";
import Swal from 'sweetalert2';
import { TestContext } from "../context/TestContext";

const TestForm = ({ title, test }) => {
  const { auth, loading, obtainUser } = React.useContext(UserContext);
  const { createTest, updateTest } = React.useContext(TestContext);
  const titleLowerCase = title.toLowerCase();
  const isSeeTest = titleLowerCase === 'ver prueba' ? true : false;
  const isAddTest = titleLowerCase === 'agregar prueba' ? true : false;
  const isUpdateTest = titleLowerCase === 'editar prueba' ? true : false;
  const showButton = isAddTest || isUpdateTest;
  const showSomeInputs = isSeeTest || isUpdateTest;

  const [formdata, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    phone: '',
    age: '',
    gender: '',
    di: '',
    address: '',
    time: '',
    result: '',
    isValid: ''
  });

  const { firstname, lastname, phone, age, gender, di, address, time, result, isValid } = formdata;

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
    if (!test) return;
    const setData = () => {
      setFormData({
        firstname: test.firstname,
        lastname: test.lastname,
        phone: test.phone,
        age: test.age,
        gender: test.gender,
        di: test.di,
        address: test.address,
        time: test.time,
        result: test.result !== null ? test.result : '',
        isValid: test.result !== null ? test.isValid : ''
      })
    }

    setData();
  }, [test]);

  const readFormData = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstname,
        lastname,
        phone,
        age,
        gender,
        di,
        address,
        time,
        result: result !== '' ? result : undefined
      }

      if (isAddTest) {
        if (firstname === '' || lastname === '' || phone === '' || age === '' || gender === '' || di === '' || address === '' || time === '') {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifica los campos obligatorios',
            confirmButtonColor: '#0b5ed7'
          })
        }

        await createTest(data);
      }

      if (isUpdateTest) {
        data.isValid = isValid !== '' ? isValid : undefined;

        await updateTest(test._id, data)
      }

      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        age: '',
        gender: '',
        di: '',
        address: '',
        time: '',
        result: '',
        isValid: ''
      });
    } catch (err) {
    }
  }

  return (
    <section css={css`height:100vh;padding:2rem 0;position:relative;`}>
      <div css={css`position: absolute; top:3rem; left:5rem;font-size:20px !important;`}>
        <Link to="/dashboard/inicio/" css={css`color:#000 !important;`}><span className="me-2"><MdArrowBack /></span> Volver</Link>
      </div>
      <Container>
        <Row className="justify-content-center align-items-start">
          <Col xs={12} className="mb-4">
            <h1 className="text-center">{title}</h1>
          </Col>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit}>
              <Row className="pb-3">
                <Col lg={6}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="firstname" value={firstname} onChange={readFormData} disabled={isSeeTest} />
                </Col>
                <Col lg={6}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="lastname" value={lastname} onChange={readFormData} disabled={isSeeTest} />
                </Col>
              </Row>
              <Row className="pb-3">
                <Col lg={6}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" name="phone" value={phone} onChange={readFormData} disabled={isSeeTest} />
                </Col>
                <Col lg={3}>
                  <Form.Label>Edad</Form.Label>
                  <Form.Control type="number" name="age" value={age} onChange={readFormData} disabled={isSeeTest} />
                </Col>
                <Col lg={3}>
                  <Form.Label>Sexo</Form.Label>
                  <Form.Control as="select" name="gender" value={gender} onChange={readFormData} disabled={isSeeTest}>
                    <option value="">-...-</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row className="pb-3">
                <Col lg={12}>
                  <Form.Label>C.I / Pasaporte</Form.Label>
                  <Form.Control type="text" name="di" value={di} onChange={readFormData} disabled={isSeeTest} />
                </Col>
              </Row>
              <Row className="pb-3">
                <Col lg={12}>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="address" value={address} onChange={readFormData} disabled={isSeeTest} />
                </Col>
              </Row>
              <Row className="pb-3">
                <Col lg={12}>
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time" name="time" value={time} onChange={readFormData} disabled={isSeeTest} />
                </Col>
              </Row>
              <Row className="pb-3">
                <Col lg={6}>
                  <Form.Label>Resultado {isAddTest && <span className="small text-muted">(Opcional)</span>}</Form.Label>
                  <Form.Control as="select" name="result" value={result} onChange={readFormData} disabled={isSeeTest}>
                    <option value="">-...-</option>
                    <option value="true">Positivo</option>
                    <option value="false">Negativo</option>
                  </Form.Control>
                </Col>
                {showSomeInputs && (
                  <Col lg={isSeeTest ? 4 : 6}>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" name="isValid" value={isValid} onChange={readFormData} disabled={isSeeTest}>
                      <option value="">-...-</option>
                      <option value="false">Vencido</option>
                      <option value="true">Vigente</option>
                    </Form.Control>
                  </Col>
                )
                }
                {(isSeeTest && test.qrcode) && (
                  <Col lg={2}>
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                      <OverlayTrigger
                        placement={'right'}
                        overlay={
                          <Tooltip>
                            Descargar QR
                          </Tooltip>
                        }
                      >
                        <a css={css`cursor: pointer;color: #000;font-size:40px !important;`} href={test.qrcode} download={true}> <AiOutlineDownload /></a>
                      </OverlayTrigger>
                    </div>
                  </Col>
                )}
              </Row>

              {showButton && (
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Enviar
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TestForm;
